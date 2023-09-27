"use client";
import { quizCreationSchema } from "./constant";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { UserAvatar } from "@/components/user-avatar";

import { BotAvatar } from "@/components/bot-avatar";
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Heading } from "@/components/heading";
import { CandlestickChart } from "lucide-react";

const Quiz = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [Response, setResponse] = useState<string | null>(null);
  



  useEffect(() => {
    setIsClient(true);
  }, []);

  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof quizCreationSchema>>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: "",
      type: "mcq",
      amount: 3,
      language: "english", // Default value for language
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof quizCreationSchema>) => {
    try {
      const response = await axios.post("/api/tests", values);
      console.log("Received data:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Heading
        title="Quiz"
        description=""
        icon={CandlestickChart}
        iconColor="text-emerald-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Quiz</CardTitle>
            <CardDescription>Choose a topic</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Topic */}
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a topic" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide any topic here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number of Questions */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="How many questions?"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            form.setValue("amount", parseInt(e.target.value));
                          }}
                          min={1}
                          max={10}
                        />
                      </FormControl>
                      <FormDescription>
                        You can choose how many questions you would like.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Language Selection */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <select {...field}>
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                          <option value="chinese">Chinese</option>
                          <option value="other">Other</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Type Selection */}
                <div className="flex justify-between">
                  <Button
                    className={`w-1/2 rounded-none rounded-l-lg ${
                      form.getValues("type") === "mcq"
                        ? "btn-selected"
                        : "btn-non-selected"
                    }`}
                    onClick={() => {
                      form.setValue("type", "mcq");
                    }}
                    type="button"
                  >
                    <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                  </Button>
                  <Separator orientation="vertical" />
                  <Button
                    className={`w-1/2 rounded-none rounded-r-lg ${
                      form.getValues("type") === "open_ended"
                        ? "btn-selected"
                        : "btn-non-selected"
                    }`}
                    onClick={() => form.setValue("type", "open_ended")}
                    type="button"
                  >
                    <BookOpen className="w-4 h-4 mr-2" /> Fill in the Blanks
                  </Button>
                </div>

                {/* Submit Button */}
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-4 mt-4">
          
        </div>
      </div>
    </div>
  );
};

export default Quiz;
