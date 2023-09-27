"use client";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Link2 } from "lucide-react";
import { formSchema } from "./constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";



const LinkContentPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      grade: "",
      subject: "",
      topic: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: `Generate atleast 10 recommended YouTube video links in "${values.language}" related to the topic "${values.topic}" for students in "${values.grade}" grade studying the subject "${values.subject}". Provide them in JSON format with the following keys: title, link
`,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/links", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      console.log(response.data);

      form.reset();
    } catch (error: any) {
      // TODO: open pro subscription modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <div>
        <Heading
          title="Links"
          description=""
          icon={Link2}
          iconColor="text-orange-700"
          bgColor="bg-orange-500/10"
        />
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
          <div className="px-4 lg:px-8">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="
                      rounded-lg 
                      border 
                      w-full 
                      p-4 
                      px-3 
                      md:px-6 
                      focus-within:shadow-sm
                      grid
                      grid-cols-12
                      gap-2
                    "
                >
                  <FormField
                    name="language"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10">
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Type your preferred language"
                            {...field}
                            className="
                                border 
                                outline-none 
                                focus-visible:ring-0 
                                focus-visible:ring-transparent
                                py-2 px-3 
                                w-full
                              "
                          />
                        </FormControl>
                        <FormDescription>
                          You can choose your language
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="grade"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10">
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="In which grade do you Study"
                            {...field}
                            className="
                                border 
                                outline-none 
                                focus-visible:ring-0 
                                focus-visible:ring-transparent
                                py-2 px-3 
                                w-full
                              "
                          />
                        </FormControl>
                        <FormDescription>
                          You can choose your grade
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="subject"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10">
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Which subject you want to learn"
                            {...field}
                            className="
                                border 
                                outline-none 
                                focus-visible:ring-0 
                                focus-visible:ring-transparent
                                py-2 px-3 
                                w-full
                              "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="topic"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10">
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Which topic you want to learn"
                            {...field}
                            className="
                                border 
                                outline-none 
                                focus-visible:ring-0 
                                focus-visible:ring-transparent
                                py-2 px-3 
                                w-full
                              "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-12 lg:col-span-12 w-full flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="py-2"
                    >
                      Generate
                    </Button>
                  </div>
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
                <div>
                  <Empty label="Start a conversation by typing a message in the input above." />
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
                      message.role === "user"
                        ? "bg-white border border-black/10"
                        : "bg-muted"
                    )}
                  >
                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkContentPage;