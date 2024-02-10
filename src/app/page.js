import UploadForm from "@/app/(form)/form"; // Assuming correct import path

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-xl font-bold mb-8">Upload file to S3 Bucket</h1>
      <UploadForm />
    </main>
  );
}
