import { createClient } from "pexels";

export async function generateImages() {
  const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY!);
  const query = "Objects";
  const photos = await client.photos.search({ query, per_page: 2 });
  return photos;
}
