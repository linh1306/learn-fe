"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bot, Lightbulb, SendHorizontal, Settings } from "lucide-react";
import { Flex } from "@/components/app/flex";
import { Container } from "@/components/app/container";
import { useApiChat } from "@/api/chat/chat";
import { ResChatWithGeminiDto } from "@/model";
import { generateId } from "@/lib/utils";
import { useReduxData } from "@/hooks/useReduxData.hook";
import { useDispatch } from "react-redux";
import { addMessages } from "@/store/slices/AppSlice";
import { Loading } from "./_core/loading";
import { useAppModal } from "@/hooks/useAppModal.hook";
import modals from "./_core/modal";

interface Message {
  id: string;
  user?: {
    content: string;
  };
  assistant?: ResChatWithGeminiDto;
}

export default function Page() {
  const { messages } = useReduxData();
  const dispatch = useDispatch();
  const [listMessage, setListMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const modal = useAppModal(modals);

  const addNewMessage = (message: Message) => {
    setListMessages((prev) => [...prev, message]);
    dispatch(addMessages(message));
  };

  const { mutate, isPending } = useApiChat({
    mutation: {
      onSuccess: (data) => {
        const newMessage: Message = { id: generateId(), assistant: data.data };
        addNewMessage(newMessage);
        scrollToBottom();
      },
    },
  });

  useEffect(() => {
    setListMessages(messages);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: generateId(),
      user: {
        content: input,
      },
    };

    addNewMessage(newMessage);
    setInput("");
    scrollToBottom();

    mutate({
      data: {
        input,
      },
    });
  };

  const scrollToBottom = () => {
    const el = document.getElementById("chatBox");
    if (el) {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 200);
    }
  };
  return (
    <Container>
      <Container.Header className="border-b-2">hello</Container.Header>
      <Container.Content id="chatBox">
        {listMessage.map((message) => (
          <Flex
            key={message.id}
            justify={message.user ? "end" : "start"}
            gap={2}
            className="w-full p-3"
          >
            {message.assistant && (
              <Flex>
                <Bot className="w-5 h-5" />.
              </Flex>
            )}

            <div className={`max-w-[70%] ${message.user ? "order-first" : ""}`}>
              <div>
                <div tabIndex={0} className="group">
                  <p className="group-focus:hidden whitespace-pre-line text-justify">
                    {message.user?.content ?? message.assistant?.reply}
                  </p>
                  {message.assistant && (
                    <p className="hidden group-focus:block">
                      {message.assistant.vi}
                    </p>
                  )}
                </div>
                {message.assistant && (
                  <div className="mt-2">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="details">
                        <AccordionTrigger className="px-4 py-2 font-semibold border-none text-xs">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-600" />
                            <span className="font-medium text-amber-700">
                              Gợi ý:
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                          {message.assistant.fixed &&
                            message.assistant.explain && (
                              <div>
                                <div className="space-y-2">
                                  <div id="highlight">
                                    <p>{message.assistant.fixed}</p>
                                  </div>
                                  <p className="text-justify">
                                    {message.assistant.explain}
                                  </p>
                                </div>
                              </div>
                            )}
                          {message.assistant.list && (
                            <div className=" border-t-2 border-black mt-2">
                              {message.assistant.list.map((voca) => (
                                <Flex key={voca.word}>
                                  <div tabIndex={0} className="group flex-1">
                                    <p className="group-focus:hidden">
                                      {voca.word}
                                    </p>
                                    <p className="hidden group-focus:block">
                                      {voca.meaning}
                                    </p>
                                  </div>
                                  <p className="underline w-fit">Thêm</p>
                                </Flex>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
          </Flex>
        ))}
        {isPending && (
          <Flex className="p-3">
            <Bot className="w-5 h-5" />.
            <div className="ml-2">
              <Loading />
            </div>
          </Flex>
        )}
      </Container.Content>
      <Container.Footer className="flex gap-3 items-center pt-2">
        <Settings onClick={() => modal.changeConfig()} />
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2 border-b-2 border-black"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 border-none focus-visible:border-b-2 border-red-400 focus-visible:ring-0"
          />
          <Button
            variant="outline"
            className="border-none bg-transparent hover:bg-transparent"
            type="submit"
          >
            <SendHorizontal type="submit" className="w-5 h-5" />
          </Button>
        </form>
      </Container.Footer>
    </Container>
  );
}
