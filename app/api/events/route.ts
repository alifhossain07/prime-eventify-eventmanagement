import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'app/data/eventdata.json');
  const data = await fs.readFile(filePath, 'utf8');
  return new Response(data);
}
