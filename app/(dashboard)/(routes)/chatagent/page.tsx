"use client";

import * as z from "zod"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { formSchema } from "./constants";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BotIcon, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

console.log()
interface FormValues {
  prompt: string;
}

const ChatagentPage = () => {
  // const { handleSubmit, formState } = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     prompt: ""
  //   }
  // });

  const router = useRouter();
  // const proModal = useProModal();
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      console.log(newMessages)
      const response = await axios.post('/api/chatagent', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
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
        title="AI Agent"
        description="Our most advanced conversation model."
        icon={BotIcon}
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
              <FormItem className="col-span-12 lg:col-span-10">
                <FormControl className="m-0 p-0">
                  <Input {...field} className="border-0 outline-none focus-visible:ring-0 
                  focus-visible:ring-transparent" 
                  disabled={isLoading} 
                  placeholder="How do i calculate the radius of a circle?"
                  {...field}
                  />
                
                </FormControl>

              </FormItem>
            )} />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatagentPage;
