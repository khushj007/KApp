"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { formSchema } from "./constants";
import axios from "axios";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { v4 as uuidv4 } from "uuid";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-model";
import toast from "react-hot-toast";

const ConversationPage = () => {
  interface promodalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
  const { isOpen, onClose, onOpen }: promodalInterface = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //updating user data

      const limitCheck = await axios.get("api/update");

      // console.log(`limitCheck`, limitCheck);

      if (limitCheck.data.status === 201) {
        // console.log(`inside limitcheck`);
        //getting response from api
        const userMessage: ChatCompletionMessageParam = {
          role: "user",
          content: values.prompt,
        };

        const newMessages = [...messages, userMessage];

        const response = await axios.post("/api/conversation", {
          messages: newMessages,
        });

        if (response.data.status === 201) {
          setMessages((prev) => {
            return [...prev, userMessage, response.data.message];
          });
        }
      } else {
        toast.error("API COUNT IS EXCEDED FOR NORMAL VERSION");
        onOpen();
      }

      // console.log(`RESPONSE`, response.data.message);

      form.reset();
    } catch (error: any) {
      //to Open Pro model

      if (error.response.status === 500) {
        toast.error(`Websit apilimit is over we will renew it after some time`);
      } else {
        console.log(`error conversation frontend`, `Owner Api Limit is over`);
        toast.error(error.message);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="are you ready ?"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

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
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ask your question"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
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
            <Empty label="No conversation yet" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => {
              return (
                <div
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                  key={uuidv4()}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                  <p className="text-sm">{message.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
