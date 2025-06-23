import { FieldOption } from "@/components/app/form";
import { BodySignUpDto } from "@/model";

export const fields: FieldOption<BodySignUpDto>[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Nhập email của bạn",
    options: {
      required: true,
      email: true,
    },
    grid: 24,
  },
  {
    name: "name",
    label: "Họ và tên",
    type: "text",
    placeholder: "Nguyễn Văn A",
    options: {
      required: true,
    },
    grid: 24,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Nhập mật khẩu",
    options: {
      required: true,
    },
    grid: 24,
  },
];
