import { BodySignInDto } from "@/api/swagger/data-contracts";
import { FieldOption } from "@/components/form";

export const fields: FieldOption<BodySignInDto>[] = [
  {
    name: "email",
    label: "Tài khoản",
    type: "text",
    placeholder: "Nhập tài khoản",
    options: {
      required: true,
      email: true,
    },
    grid: 24,
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập mật khẩu",
    options: {
      required: true,
    },
    grid: 24,
  },
];
