export type KeysRouteParams = {
  // auth
  signIn: never;
  signUp: never;
  forgotPassword: never;

  // user
  home: never;
  chat: never;
  topic: never;
  topicId: "topicId";
};

export type RouteKey = keyof KeysRouteParams;

export const routes: Record<RouteKey, string> = {
  // auth
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  // user
  home: "/",
  chat: "/chat",
  topic: "/topic",
  topicId: "/topic/[topicId]",
};
