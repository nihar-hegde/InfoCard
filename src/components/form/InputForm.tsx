"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { InputFormSchema } from "@/lib/validators";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { createCard } from "@/actions/cardinfo";
import { useRouter } from "next/navigation";

export function InputForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof InputFormSchema>>({
    resolver: zodResolver(InputFormSchema),
    defaultValues: {
      name: "",
      description: "",
      interests: [],
      githubUrl: "" || undefined,
      twitterUrl: "" || undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof InputFormSchema>) {
    try {
      await createCard(data);
      form.reset();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === "Enter" && field.name === "interests") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("interests", {
            type: "required",
            message: "Interest must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("interests", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("interests");
        }
      } else {
        form.trigger();
      }
    }
  };
  const handleInterestRemove = (interest: string, field: any) => {
    const newInterests = field.value.filter((t: string) => t !== interest);
    form.setValue("interests", newInterests);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Enter your interest here and press Enter..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex justify-start items-center mt-2.5 gap-2.5">
                      {field.value.map((interest: any) => (
                        <Badge
                          key={interest}
                          className="flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          onClick={() => handleInterestRemove(interest, field)}
                        >
                          {interest}
                          <X className="w-4 h-4 cursor-pointer object-contain " />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Url</FormLabel>
              <FormControl>
                <Input placeholder="Github Url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TwitterURl </FormLabel>
              <FormControl>
                <Input placeholder="Twitter Url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
