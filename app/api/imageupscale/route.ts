import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate';
import { writeFile } from "fs/promises";
import path from "path";
import axios from "axios";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});


export const POST = async(req, res) => {

  try {

      // Parse the incoming form data
      const formData = await req.formData();

      // Get the file from the form data
      const file = formData.get("file");
      const { userId } = auth();
      
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!replicate.auth) {
        return new NextResponse("Replicate API Key not configured.", { status: 500 });
      }
  
      // Check if a file is received
      if (!file) {
        // If no file is received, return a JSON response with an error and a 400 status code
        return NextResponse.json({ error: "No files received." }, { status: 400 });
      }

      // Convert the file data to a Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Replace spaces in the file name with underscores
      const filename = file.name.replaceAll(" ", "_");
      console.log(filename);

      const absolutePath = path.join(process.cwd(), "public/assets/" + filename);
      // Write the file to the specified directory (public/assets) with the modified filename
      await writeFile(
        absolutePath,
        buffer
      );

      const fileURL = await getImage(filename);
      
      // ATTENTION: WE ARE USING HTTPS TO SERVE OUR FILES, BECUASE REPLICATE API NEEDS TO READ THE CONTENT WHICH IT CAN'T FROM LOCALHOST
      // FOR THE DEMONSTRATION PURPOSE I'VE USE NGROK FREE TIER TO MAP MY LOCALHOST TO HTTPS.  
      const input = {
        image: "https://0e41-111-88-122-108.ngrok-free.app/api/images?imageName="+file.name,
      }

      const response = await replicate.run(
        "jingyunliang/swinir:660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
        {
          input
        }
      );
      return NextResponse.json(response);
    } catch (error) {
      console.log('[IMAGE_UPSCALE_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
};

async function getImage(img : string) {
  try {
    let imageName = img; // Replace with your image name
    const response = await axios.get(`/api/images?imageName=${imageName}`, {
      responseType: 'blob' // Ensure response is treated as a Blob
    });

    // Assuming you want to create a URL for the image blob
    const imageUrl = URL.createObjectURL(response.data);

    // Now imageUrl contains the URL for the image blob
    console.log('Image URL:', imageUrl);

    // You can use the imageUrl variable in your application as needed
    // For example, displaying the image in an <img> element
    return imageUrl;

  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

