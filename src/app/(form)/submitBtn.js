"use client";

import { useFormStatus } from "react-dom";

import React from "react";

export default function Submitbutton(){
  const { pending } = useFormStatus();
  return (
<button
  type="submit"
  className={"bg-blue-500 text-white font-bold py-2 px-4 rounded"}
  aria-disabled={pending}
>
  {pending ? "Uploading...." : "Upload File"}
</button>

  );
};

