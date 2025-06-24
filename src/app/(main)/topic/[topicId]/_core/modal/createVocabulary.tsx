import { useApiCreateVocabulary } from "@/api/topics/topics";
import FormBuilder, { FieldOption } from "@/components/app/form";
import { BaseModalProps } from "@/hooks/useAppModal.hook";
import { BodyCreateVocabularyDto } from "@/model";

const fields: FieldOption<BodyCreateVocabularyDto>[] = [
  {
    name: "context",
    label: "Từ vựng",
    type: "text",
    placeholder: "Nhập nội dung",
    options: {
      required: true,
    },
    grid: 6
  },
  {
    name: "meaning",
    label: "Nghĩa",
    type: "text",
    options: {
      required: true,
    },
    grid: {
      xs: 6
    },
  },
  {
    name: "phonetic",
    label: "Phiên âm",
    type: "text",
    placeholder: "Nhập phiên âm",
    grid: 12,
  },
  {
    name: "example",
    label: "Ví dụ",
    type: "text",
    grid: 6,
  },
  {
    name: "meaningExample",
    label: "Nghĩa",
    type: "text",
    grid: 6,
  },

];

export default function CreateVocaBularyModal({ topicId, close }: BaseModalProps & {
  topicId: string;
}) {
  const { mutate } = useApiCreateVocabulary({
    mutation: {
      onSuccess: () => {
        close();
      },
    },
  });

  return (
    <FormBuilder<BodyCreateVocabularyDto>
      fields={fields}
      onSubmit={(values) => {
        mutate({ topicId, data: values });
      }}
      onCancel={close}
      button={{
        ok: "Add",
        cancel: "Cancel",
      }}
    />
  );
}
