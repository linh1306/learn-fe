"use client";

import FormBuilder, { FormRef } from "@/components/app/form";
import { Button } from "@/components/ui/button";
import { useCallback, useRef } from "react";
import { fields } from "./_core/form.fields";
import { BodySignUpDto } from "@/model";

export default function Page() {
  const form = useRef<FormRef<BodySignUpDto>>(null);

  const handleSubmit = useCallback(() => {
    const submit = form.current?.handleSubmit((data) => {
      console.log({ data });
    });
    submit?.();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold text-center">Đăng Ký</p>

      <FormBuilder ref={form} fields={fields} onSubmit={() => {}} />

      <Button onClick={handleSubmit}>Đăng Ký</Button>
      <div className="text-center text-sm">
        Bạn đã có tài khoản?{" "}
        <a href="sign-in" className="underline underline-offset-4">
          Đăng nhập
        </a>
      </div>
    </div>
  );
}
