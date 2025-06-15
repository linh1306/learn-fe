import {
  useApiGetMetaUser,
  useApiUpdateMetaUser,
} from "@/api/meta-data-user/meta-data-user";
import FormBuilder, { FieldOption } from "@/components/app/form";
import { BaseModalProps } from "@/hooks/useAppModal.hook";
import { BodyUpdateMetaUser } from "@/model";

const fields: FieldOption<BodyUpdateMetaUser>[] = [
  {
    name: "topicsId",
    label: "Nội dung",
    type: "select_async",
    placeholder: "Nhập nội dung",
    options: {
      required: true,
      type: "topic",
    },
  },
  {
    name: "level",
    label: "Level",
    type: "number",
    options: {
      required: true,
    },
    grid: 12,
  },
  {
    name: "typeLevel",
    label: "Loại level",
    type: "select",
    options: {
      required: true,
      options: [
        { label: "Toeic", value: "toeic" },
        { label: "Ielts", value: "ielts" },
      ],
    },
    grid: 12,
  },
];

export default function ChangeConfigModal({ onClose, close }: BaseModalProps) {
  const { data } = useApiGetMetaUser();
  const { mutate } = useApiUpdateMetaUser({
    mutation: {
      onSuccess: () => {
        close();
      },
    },
  });
  const handleCancel = () => {
    onClose?.();
  };
  const { level = 150, typeLevel = "toeic", topicsId = "" } = data?.data ?? {};

  return (
    <FormBuilder<BodyUpdateMetaUser>
      fields={fields}
      defaultValues={{
        level,
        typeLevel,
        topicsId,
      }}
      onSubmit={(values) => {
        mutate({ data: values });
      }}
      onCancel={handleCancel}
      button={{
        ok: "Cập nhật",
        cancel: "Hủy",
      }}
    />
  );
}
