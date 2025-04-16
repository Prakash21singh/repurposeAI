"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";

type Props = {};

const FormSchema = z.object({
  prompt: z.string(),
});

function CraftPost({}: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    field: any
  ) {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)(e);
    } else if (e.key === "Enter" && e.ctrlKey) {
      field.onChange(field.value + "\n");
    }
  }

  return (
    <div>
      <Card className="w-full fixed bottom-0 left-0 md:relative lg:w-[700px]">
        <CardContent className="w-full ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex items-end gap-x-3">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormControl>
                      <Textarea
                        onKeyDown={(e) => handleKeyDown(e, field)}
                        placeholder="Type the content overview you want to create"
                        className="resize-none bg-transparent focus-visible:ring-0 focus-visible:outline-none outline-none border-none max-h-60 overflow-auto flex-1 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="rounded-full border-none" variant={"ghost"}>
                <ArrowUpRight className="text-cream" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CraftPost;
