"use client"
import { UploadFile } from "./actions";
import { useFormState } from "react-dom";
import SubmitBtn from "@/app/(form)/submitBtn";

const initialState = { message: null };

export default function UploadForm() {
  const [state, formAction] = useFormState(UploadFile, initialState);

  return (
    <>
      <form action={formAction} className="flex flex-col items-center justify-center">
        <input
          type="file"
          id="file"
          accept="images/*"
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        <SubmitBtn/>
      </form>
      {state?.status && (
        <div>
          {state?.message}
        </div>
      )}
    </>
  );
}
