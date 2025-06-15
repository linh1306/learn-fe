import { BodySignUpDto } from "@/api/swagger/data-contracts";
import { FieldOption } from "@/components/form";

export const fields: FieldOption<BodySignUpDto>[] = [
  {
    name: "code",
    label: "Mã sinh viên",
    type: "text",
    placeholder: "B20DCCN000",
    options: {
      required: true,
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
  // {
  //   name: "course",
  //   label: "Khóa",
  //   type: "text",
  //   placeholder: "D20",
  //   options: {
  //     required: true,
  //   },
  //   grid: {
  //     xs: 24,
  //   },
  // },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Tạo mật khẩu của bạn",
    options: {
      required: true,
    },
    grid: 24,
  },
];
