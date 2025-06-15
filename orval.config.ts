import { defineConfig } from "orval";

export default defineConfig({
  learnApi: {
    output: {
      mode: "tags-split",
      target: "src/api",
      schemas: "src/model",
      client: "react-query",
      mock: true,
      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: "page",
          options: {
            staleTime: 10000,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },

        mutator: {
          path: "src/api/index.ts",
          name: "customMutator",
        },
      },
    },
    input: {
      target: "http://localhost:5000/api-json",
    },
  },
});
