import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!replicate.auth) {
      return new NextResponse("Replicate API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Number of Images is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const input = {
      width: parseInt(resolution.split('x')[0]),
      height: parseInt(resolution.split('x')[1]),
      prompt: prompt,
      scheduler: "K_EULER",
      num_outputs: parseInt(amount),
      guidance_scale: 7.5,
      num_inference_steps: 50
    }

    console.log(input);

    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input
      }
    );

    // const response = {
    //   "data" : [
    //     "https://replicate.delivery/pbxt/LHe0CEfdecJdhJeWPEYgMSQB05FBqux4p3yuQNarr9d6DDCKB/out-0.png",
    //     "https://replicate.delivery/pbxt/rOUxz0k1cnaDJ5fMfxZvT3eklRhKuk3c9zO59c4ekfKnXFEUC/out-0.png",
    //     "https://replicate.delivery/pbxt/9hAJhqSQjqYzLVkZAk4ureiLMXZOLHtkVZ7yQvcHz8DBgQQJA/out-0.png"
    //   ]
    // }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};