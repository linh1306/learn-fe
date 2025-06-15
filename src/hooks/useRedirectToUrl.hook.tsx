import { KeysRouteParams, RouteKey, routes } from "@/router/router";
import { usePathname, useRouter } from "next/navigation";

export function useRedirectToUrl() {
  const router = useRouter();
  const pathname = usePathname();

  const redirect = <K extends RouteKey>(
    key: K,
    ids?: Record<KeysRouteParams[K], string>
  ) => {
    console.log("key", key);

    const urlTemplate = routes[key];
    if (!urlTemplate) throw new Error(`Route ${key} not found`);

    let url = urlTemplate;
    if (ids) {
      Object.entries(ids).forEach(([id, value]) => {
        url = url.replace(`[${id}]`, String(value));
      });
    }

    if (url.match(/\[.*?\]/)) {
      throw new Error(`Missing required params for route ${key}`);
    }

    router.push(url);
  };

  return { router, redirect, pathname };
}
