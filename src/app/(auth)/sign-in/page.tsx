"use client";

import FormBuilder, { FormRef } from "@/components/app/form";
import { Button } from "@/components/ui/button";
import { useCallback, useRef } from "react";
import { fields } from "./_core/form.fields";
import { useRedirectToUrl } from "@/hooks/useRedirectToUrl.hook";
import { useApiSignIn } from "@/api/auth/auth";
import { BodySignInDto } from "@/model";

export default function Page() {
  const { redirect } = useRedirectToUrl();
  const form = useRef<FormRef<BodySignInDto>>(null);

  const { mutate: signIn, isPending } = useApiSignIn({
    mutation: {
      onSuccess: () => {
        redirect("chat");
      },
    },
  });

  const handleClick = useCallback(() => {
    const submit = form.current?.handleSubmit((data) => {
      signIn({ data });
    });
    submit?.();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold text-center">Đăng nhập</p>
      <div>
        <FormBuilder
          defaultValues={{
            email: "admin@example.com",
            password: "linh0000",
          }}
          ref={form}
          fields={fields}
          onSubmit={() => {}}
        />

        <a
          href="#"
          className="ml-auto text-sm underline-offset-4 hover:underline"
        >
          Quên mật khẩu?
        </a>
      </div>
      <Button onClick={handleClick} isLoading={isPending}>
        Đăng nhập
      </Button>
      <div className="text-center text-sm">
        Bạn chưa có tài khoản?{" "}
        <a href="sign-up" className="underline underline-offset-4">
          Đăng ký
        </a>
      </div>
    </div>
  );
}
