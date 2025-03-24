import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { db } from '$lib/server/db';
import { profileImages } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

async function convertToWebP(buffer: Buffer): Promise<Buffer> {
	return await sharp(buffer).webp({ quality: 80 }).toBuffer();
}

export async function POST({ request }) {
	const formData = await request.formData();
	const imageFile = formData.get('image') as File;
	const userId = formData.get('userId') as string;
	if (!imageFile || !userId) {
		error(400, 'Image or User ID missing');
	}

	const arrayBuffer = await imageFile.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	console.log(imageFile, userId);
	try {
		const [existingImage] = await db
			.select()
			.from(profileImages)
			.where(eq(profileImages.userId, userId));
		if (existingImage) {
			await db.delete(profileImages).where(eq(profileImages.id, existingImage.id));
		}
		const webpBuffer = await convertToWebP(buffer);
		await db.insert(profileImages).values({
			userId,
			image_data: webpBuffer
		});
		console.log(webpBuffer);
		return new Response('Image uploaded successfully');
	} catch (error) {
		console.error('Error converting image:', error);
		throw new Error('Image processing failed');
	}
}
