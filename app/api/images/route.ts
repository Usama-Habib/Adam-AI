import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async(request: NextRequest, res: NextApiResponse) =>  {
  const searchParams = request.nextUrl.searchParams;
  const imageName = searchParams.get("imageName");
    console.log(imageName)
    if (!imageName) {
      res.statusCode = 400;
      return res.end('Image name is required');
    }

    const imagePath = path.join(process.cwd(), 'public', 'assets', `${imageName}`);

    try {
      const image = fs.readFileSync(imagePath);
      const response = new NextResponse(image)
      response.headers.set('content-type', 'image/png');
      return response;
    } catch (error) {
      return NextResponse.json({ messsage: "Oops! File Not Found", "error": error});
    }
}
