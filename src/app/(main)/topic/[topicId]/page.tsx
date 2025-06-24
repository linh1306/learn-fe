"use client";

import { use } from "react";
import { Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApiGetTopic } from "@/api/topics/topics";
import { Flex } from "@/components/app/flex";
import { Container } from "@/components/app/container";
import { useAppModal } from "@/hooks/useAppModal.hook";
import modals from "./_core/modal";

interface Props {
  params: Promise<{ topicId: string }>;
}

export default function VocabularyPage({ params }: Props) {
  const modal = useAppModal(modals)
  const { topicId } = use(params);
  const { data } = useApiGetTopic(topicId!, {
    query: {
      enabled: !!topicId,
    },
  });

  const playPronunciation = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Container>
      <Container.Header className="justify-between" title={data?.data?.name}>
        <Button onClick={()=>modal.CreateVocaBularyModal({topicId})}>Add</Button>
      </Container.Header>
      <Container.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.vocabularies?.map((word) => (
            <Card key={word.id} tabIndex={0} className="group backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    <p className="group-focus:hidden">{word.context}</p>
                    <p className="hidden group-focus:block">{word.meaning}</p>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => playPronunciation(word.context)}
                    className="h-8 w-8 p-0"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{word.phonetic}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Example sentence */}
                  <Flex className="bg-gray-50 p-3 rounded-lg" gap={2}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playPronunciation(word.example)}
                      className="h-5 w-5 p-0"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <p className="group-focus:hidden text-sm text-gray-700">
                      {word.example}
                    </p>
                    <p className="hidden group-focus:block text-sm text-gray-700 italic">
                      {word.meaningExample}
                    </p>
                  </Flex>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container.Content>
    </Container>
  );
}
