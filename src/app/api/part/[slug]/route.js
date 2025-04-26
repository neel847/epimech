import dbConnect from '@/lib/dbConnect';
import WaterPump from '@/models/WaterPump';
import OtherParts from '@/models/OtherParts';
import { slugify } from '@/utils/slugify';

export async function GET(req, { params }) {
  await dbConnect();
  const slug = params.slug.toLowerCase();

  const [wp, op] = await Promise.all([
    WaterPump.find({}),
    OtherParts.find({})
  ]);

  const allParts = [...wp, ...op];

  const part = allParts.find(p => {
    const keys = Object.keys(p.part_number || {});
    const partNumber = keys.length > 0 ? p.part_number[keys[0]] : null;
    if (partNumber?.split("/").length > 1) {
      const [firstPart, secondPart] = partNumber.split("/");
      const slug1 = slugify(firstPart);
      return slug === slug1;
    }
    return keys.some(key => partNumber === slug);
  });

  if (!part) return new Response('Part not found', { status: 404 });
  return Response.json(part);
}
