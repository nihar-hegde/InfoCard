"use server";

import { db } from "@/lib/db";
import { InputFormSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCard = async (values: z.infer<typeof InputFormSchema>) => {
  try {
    const validatedValues = InputFormSchema.safeParse(values);

    if (!validatedValues.success) {
      return { error: "Invalid Inputs" };
    }
    const { name, description, interests, githubUrl, twitterUrl } =
      validatedValues.data;
    await db.cardinfo.create({
      data: {
        name: name,
        description: description,
        interests: interests,
        githubUrl: githubUrl,
        twitterUrl: twitterUrl,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Card created succesfully!" };
  } catch (error) {
    console.log(error);
  }
};

export const getCard = async () => {
  try {
    const data = await db.cardinfo.findMany({});
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSinglecard = async (id: string) => {
  try {
    const userData = await db.cardinfo.findUnique({
      where: {
        id: id,
      },
    });
    return userData;
  } catch (error) {
    console.log(error);
  }
};
