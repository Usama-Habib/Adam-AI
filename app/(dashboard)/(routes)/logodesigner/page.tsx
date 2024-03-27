"use client";

import * as z from "zod"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { formSchema, amountOptions, resolutionOptions } from "./constants";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Download, Loader, PencilLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

interface FormValues {
  prompt: string;
}

const logodesignerPage = () => {

  const router = useRouter();
  const [logos, setLogos] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
      negative_prompt: "" 
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLogos([]);
      const response = await axios.post('/api/generatelogo',values);
      const urls = response.data;
      setLogos(urls);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading 
        title="AI Logo Creator"
        description="Turn your prompt into an eye catching logo."
        icon={PencilLineIcon}
        iconColor="text-violet-500"
        bgColor="bg-black-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="rounded-lg border w-full 
                     p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
            <FormField name="prompt" render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormControl className="m-0 p-0">
                  <Input {...field} className="border-0 outline-none focus-visible:ring-0 
                  focus-visible:ring-transparent" 
                  disabled={isLoading} 
                  placeholder="Mars Academy Minimlist Logo"
                  {...field}
                  />
                
                </FormControl>

              </FormItem>
            )} />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-1">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-1">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="negative_prompt"
              render={({ field }) => (
                <FormItem className="col-span-6 lg:col-span-2">
                <FormControl className="m-0 p-0">
                  <Input {...field} className="" 
                  disabled={isLoading} 
                  placeholder=" High quality, Clear, Clean"
                  {...field}
                  />
                
                </FormControl>

              </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
          </Form>
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

export default logodesignerPage;
