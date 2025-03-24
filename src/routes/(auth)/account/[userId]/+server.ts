import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { profileImages } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
	const { userId } = params;

	try {
		const imageData = await db
			.select({ image: profileImages.image_data })
			.from(profileImages)
			.where(eq(profileImages.userId, userId))
			.limit(1)
			.then((rows) => rows[0]);

		if (!imageData || !imageData.image) {
			return new Response('Image not found', { status: 404 });
		}

		return new Response(Buffer.from(imageData.image), {
			headers: {
				'Content-Type': 'image/webp'
			}
		});
	} catch (error) {
		console.error('Error fetching image:', error);
		return json({ error: 'Failed to load image' }, { status: 500 });
	}
}
