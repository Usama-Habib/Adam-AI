"use client";

import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { useRouter } from "next/navigation";
// import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Download, Loader, MoveVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";


const photoUpScalePage = () => {

const [image, setImage] = useState({ preview: '', data: '' })


const router = useRouter();
const [logos, setLogos] = useState<string[]>([]);
const [isLoading, setLoading] = useState<boolean>(false);
  

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const img = {
    preview: URL.createObjectURL(event.target.files[0]),
    data: event.target.files[0],
  }
  setImage(img)
  // console.log(image)

  // getImage();
};

const handleSubmit = async (event) => {
  setLoading(true);
  setLogos([]);
  event.preventDefault();
  let formData = new FormData()
  formData.append('file', image.data)
  const response = await axios.post('/api/imageupscale',formData, {headers: { "Content-Type" : "multipart/form-data" }});    
  const urls = response.data;
  setLogos([urls]);

  console.log("successfully created");
  setLoading(false);
};

async function getImage(imageName: string) {
  try {
    const response = await axios.get('/api/images?imageName='+imageName, {
      responseType: 'arraybuffer' // Response type is set to arraybuffer to handle binary data (image)
    });
    const blob = new Blob([response.data], { type: 'image/jpeg' }); // Create a Blob from the response data
    const url = URL.createObjectURL(blob); // Convert the Blob into a URL and set it as the image source
    console.log(url);
  } catch (error) {
    console.error('Error fetching image:', error);
  }

}

  
  return (
    <div>
      <Heading 
        title="AI Photo Upscale"
        description="Give us an image and get an stunning Up-scaled one"
        icon={MoveVerticalIcon}
        iconColor="text-violet-500"
        bgColor="bg-black-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="rounded-lg border w-full 
                     p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                     encType="multipart/form-data"
                     >
            <FormField name="image" render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-11">
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={(e) => form.setValue("image", e.target.files)}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </FormItem>
            )} />          
            <Button className="col-span-12 lg:col-span-1 w-full" disabled={isLoading}>
              Up Scale
            </Button>
          </form>
          </Form> */}

      <form method="POST"
        onSubmit={handleSubmit}
        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        encType="multipart/form-data"
      >
        <div className="col-span-12 lg:col-span-11">
          <input
            type="file"
            name="image"
            id="imageInput"
            accept="image/*"
            disabled={isLoading}
            onChange={handleFileChange}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="col-span-12 lg:col-span-1 w-full" disabled={isLoading}>
          Up Scale
        </button>
      </form>

        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {logos.length === 0 && !isLoading && (
            <Empty label="No Logos generated." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {logos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default photoUpScalePage;
