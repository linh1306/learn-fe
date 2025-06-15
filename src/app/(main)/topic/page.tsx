"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiGetTopicsInfinite } from "@/api/topics/topics";
import { Flex } from "@/components/app/flex";
import { useRedirectToUrl } from "@/hooks/useRedirectToUrl.hook";

export default function TopicsPage() {
  const { redirect } = useRedirectToUrl();
  const { data, isPending, fetchNextPage, hasNextPage } =
    useApiGetTopicsInfinite(
      {},
      {
        query: {
          getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < 10) return undefined;
            return allPages.length + 1; // Trả về page tiếp theo
          },
          initialPageParam: 1,
        },
      }
    );
  return (
    <Flex vertical className="max-w-7xl mx-auto" gap={6}>
      {/* Topics Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.pages
          .flatMap((page) => page.data)
          ?.map((topic) => (
            <Card key={topic.id} className="group backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">
                  {topic.name}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {100} từ
                </Badge>
              </CardHeader>
              <CardContent className="h-full">
                <div className="h-full flex flex-col justify-between">
                  <p className="leading-relaxed">{topic.description}</p>
                  <Button
                    className="w-full mt-4 transition-colors"
                    onClick={() => {
                      redirect("topicId", {
                        topicId: topic.id,
                      });
                    }}
                  >
                    Học ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <Flex justify="center" className="w-full">
        <Button
          hidden={!hasNextPage}
          isLoading={isPending}
          onClick={() => {
            fetchNextPage();
          }}
        >
          Load more
        </Button>
      </Flex>
    </Flex>
  );
}
