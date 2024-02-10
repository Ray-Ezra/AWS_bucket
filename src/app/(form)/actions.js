"use server"
import { revalidatePath } from "next/cache"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";



// NEXT_AWS_S3_BUCKET_NAME= reezy-bucket

	const client = new S3Client({
		region: process.env.NEXT_AWS_S3_REGION,
		credentials:{
			accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
			secretAccessKey:process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY
		}
	});

	async function uploadFileToS3(file, fileName){
		const fileBuffer = file;
		const params = {
			Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
			Key: `${fileName}`,
			body: fileBuffer,
			contentType: "image/jpg"
		}

		const command = new PutObjectCommand(params)
		try {
			const response =await client.send(command)
			console.log("file uploaded Succesfully", response)
			return fileName
		} catch (error) {
			throw error;
		}

	}

export async function UploadFile(prevState, formData) {
      try {
				const file = formData.get("file")

				if(file.size === 0){
					return{ status: "error", messsage:"PPlease select file"}
				}
				const buffer = Buffer.from(await file.arrayBuffer());
				await uploadFileToS3(buffer, file.name)



				revalidatePath("/");
				return {status: "success", messsage:"File upload Succeful!"}
			} catch (error) {
				return{status: "error", messsage:"File upload not Succeful!"}
			}
}