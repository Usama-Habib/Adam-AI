

'use client'

import React from "react"
import Image from "next/image"


const features = [
    {
        name: "AI IMAGE UPSCALER",
        description:
          "Our Image upscalers  allow you to increase the resolution of an image, making it larger and more detailed. This can be useful for improving the quality of low-resolution images or for creating high-resolution versions of images for printing or other uses.",
        image: "/images/icon-cloud.png",
        alt: "Customizable",
        color: "blue"
      },
      {
        name: "PDF AI CHAT ",
        description:
          "PDF to AI Reader tool uses AI to extract and summarize the key points from a PDF document. Helpful tool for quickly reviewing long documents, creating meeting summaries, or generating content for social media posts or blog articles.",
        image: "/images/icon-fast.png",
        alt: "Customizable",
      },
      {
        name: "AI IMAGE GENERATOR",
        description:
          "AI Image Generation tool allows you to create custom images using natural language input by simply describe the image you want.",
        image: "/images/icon-journey.png",
        alt: "Customizable",
      },
      {
        name: "AI CONTENT GENERATOR",
        description:
          "AI Content Generation tool which creates custom professional content like blog post or articles for marketing campaigns and social media content.",
        image: "/images/icon-layer.png",
        alt: "Customizable",
      },
      {
        name: "AI VIDEO TRANSCRIPT",
        description:
          "YouTube transcription tools allow you to automatically generate transcripts of the audio in YouTube videos.",
        image: "/images/icon-location.png",
        alt: "Customizable",
      },
      {
        name: "AI LOGO GENERATOR",
        image: "/images/icon-support-1.png",
        description: "AI Logo Generator create custom logos based on user natural language input. Users can describe the type of logo they want, and the AI will generate several options to choose from. ",
        alt: "Customizable",
      },
    ]

const SecondSection = () => {
    return ( 
    <div className="">
        <div className="
md:flex-row
      
flex-col
items-center
flex  justify-center pb-10
        
        ">
            <div className="p-5 justify-center md:w-1/3">
                <div className="
                bg-gradient-to-r
                from-blue-900
                to-red-500
                bg-clip-text
                text-transparent
                text-4xl
                md:text-6xl
                font-bold
                pb-10
                
                ">
                    Leverage the power of GPTs and other LLMs.

                </div>
                <div className="text-2xl mb-8">
                

                </div>
                <button className="bg-blue-500 text-white p-4 justify-center flex md:w-1/3 rounded-lg hover:bg-blue-600">
                        Get Started
                </button>
                </div>
                

                <video className="rounded-xl md:w-2/5 p-4 md:p-0 "  autoPlay muted loop >
                    <source src="/content/video-2.mp4" type="video/mp4" />

                </video>

            </div>

            <div className="flex-col items-center justify-center">
                <div className="
                text-3xl
                flex
                justify-center
                md:text-5xl
                font-bold
                pt-5
                pb-10
                bg-gradient-to-r
                from-purple-400
                to-blue-800
                bg-clip-text
                text-transparent

                
                
                ">
                        Uplift your creativity.


                </div>

                <div className="grid grid-cols-1 p-4 md:grid md:grid-cols-3 gap-4 md:px-40">
                    {features.map((feature, index) => (
                        <div
                        key={index}
                        className="flex-col space-y-6 pb-10 border
                        
                        p-8 rounded-xl items-center justify-center w-full hover:scale-105 transform transition-all duration-500 ease-in-out
                        "
                        >
                            <div className="
                            text-gray-600 text-3xl font-bold
                            ">
                                <Image
                                src={feature.image}
                                alt={feature.alt}
                                width={300}
                                height={300}
                                className="object-contain h-20 w-20 items-center justify-center flex mb-10"
                                />
                                <div>
                                    <div className="text-2xl pb-4 bg-gradient-to-t
                                    from-black
                                    to-gray-400
                                    bg-clip-text
                                    text-transparent

                                    
                                    
                                    ">{
                                    feature.name}
                                    </div>

                                    <div className="bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent text-lg">
                                        {feature.description}




                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>



  );
}
 
export default SecondSection;