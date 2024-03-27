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
    const { prompt, amount = 1, resolution = "512x512", negative_prompt = "" } = body;

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
      num_inference_steps: 50,
      negative_prompt:negative_prompt
    }

    const response = await replicate.run(
      "fofr/sdxl-abstract:a28d461dc16846310d03d12f8cbc31c5ef487356aa7b48ac1709969418768a03",
      {
        input
      }
    );
    return NextResponse.json(response);
  } catch (error) {
    console.log('[LOGO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};