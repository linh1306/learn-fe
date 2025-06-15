import { useEffect, useMemo } from "react";
import { SocketManager } from "../service/Socket.service";
import { MessagesEntity, NotificationsEntity } from "@/api/swagger/data-contracts";

type SubEvent = {
  CHAT: {
    receiveMessage: (message: MessagesEntity) => void;
  };
  NOTIFICATION: {
    receiveNotification: (notification: NotificationsEntity) => void;
  };
};
type PubEvent = {
  CHAT: {
    sendMessage: Pick<MessagesEntity, "content" | "groupChatId">;
  };
  NOTIFICATION: object;
};

const PubEvents: { [K in keyof PubEvent]: (keyof PubEvent[K])[] } = {
  CHAT: ["sendMessage"],
  NOTIFICATION: [],
};

export type KeySocket = keyof SubEvent;

type SubEventHandlers<T extends KeySocket> = {
  [K in keyof SubEvent[T]]: SubEvent[T][K];
};

interface UseSocketProps<T extends KeySocket> {
  key: T;
  onEvents?: Partial<SubEventHandlers<T>>;
}

type SocketResult<T extends KeySocket> = {
  isConnected: boolean;
} & {
  [K in keyof PubEvent[T]]: (data: PubEvent[T][K]) => void;
};

export const useAppSocket = <T extends KeySocket>({
  key,
  onEvents,
}: UseSocketProps<T>): SocketResult<T> => {
  const socketInfo = SocketManager.connectSocket();

  useEffect(() => {
    if (onEvents && socketInfo) {
      Object.entries(onEvents).forEach(([eventHandlerName, handler]) => {
        if (typeof handler === "function") {
          const eventName = eventHandlerName;
          const eventHandler = handler as (...args: any[]) => void;
          socketInfo.io.on(eventName, eventHandler);
        }
      });

      return () => {
        if (socketInfo) {
          Object.entries(onEvents).forEach(([eventHandlerName, handler]) => {
            if (typeof handler === "function") {
              const eventName = eventHandlerName;
              const eventHandler = handler as (...args: any[]) => void;
              socketInfo.io.off(eventName, eventHandler);
            }
          });
        }
      };
    }
  }, [socketInfo.io, onEvents]);

  const pubFunctions = {} as {
    [K in keyof PubEvent[T]]: (data: PubEvent[T][K]) => void;
  };

  if (socketInfo.io) {
    const pubEvents = PubEvents[key];

    // Duyệt qua các pub events và tạo các hàm tương ứng
    pubEvents.forEach((eventName) => {
      pubFunctions[eventName] = (data: any) => {
        socketInfo.io.emit(eventName as string, data);
      };
    });
  }

  const isConnected = useMemo(() => {
    return socketInfo?.isConnected || false;
  }, [socketInfo?.isConnected]);

  return {
    isConnected,
    ...pubFunctions,
  } as SocketResult<T>;
};
