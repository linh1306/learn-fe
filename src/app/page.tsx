"use client";
import React from "react";
import { useApiProfile, useApiSignIn } from "@/api/auth/auth";

export default function LoginPage() {
  const { mutate } = useApiSignIn();
  const { data } = useApiProfile();

  const handleClick = () => {
    mutate({
      data: {
        email: "admin@example.com",
        password: "linh0000",
      },
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Đăng nhập</button>
      {JSON.stringify(data)}
    </div>
  );
}
