import dbConnect from '@/lib/dbConnect';
import WaterPump from '@/models/WaterPump';
import OtherParts from '@/models/OtherParts';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';

  const [waterPumpParts, otherParts] = await Promise.all([
    WaterPump.find({
      is_hide: false,
      $or: [
        { part_name: { $regex: search, $options: 'i' } },
        { 'part_number.EMD 710 / EMD 645': { $regex: search, $options: 'i' } },
      ]
    }).sort({ rank: 1 }), // Sort WaterPump parts by rank
    OtherParts.find({
      is_hide: false,
      $or: [
        { part_name: { $regex: search, $options: 'i' } },
        { 'part_number.EMD 710 / EMD 645': { $regex: search, $options: 'i' } },
      ]
    }).sort({ rank: 1 }) // Sort OtherParts by rank
  ]);

  const merged = [...waterPumpParts, ...otherParts]; // WaterPump first, then OtherParts
  return Response.json(merged);
}
