import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const uploadClient = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
  },
});

const uploadToS3 = async (buffer, filename) => {
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${filename}`,
    Body: buffer,
    ContentType: "image/png", // Assuming it's a PNG file
  };
  const command = new PutObjectCommand(params);
  try {
    const response = await uploadClient.send(command);
    console.log(response);
    return filename;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export async function UploadFile(prevState, formData) {
  try {
    const file = formData.get("file");
    console.log(file);
    if (!file || file.size === 0) {
      return { status: "error", message: "Please add a file!" };
    }
    const buffer = Buffer.from(file.buffer);
    await uploadToS3(buffer, file.name);
    revalidatePath("/");
    return { status: "success", message: "File has been uploaded" };
  } catch (err) {
    console.log(err);
    return { status: "error", message: "File has not been uploaded" };
  }
}
