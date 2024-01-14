"use server";

import { db } from "@/lib/db";
import { InputFormSchema } from "@/lib/validators";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

interface CreateCardProps {
  userId: string;
  name: string;
  description: string;
  interests: string[];
  githubUrl?: string;
  twitterUrl?: string;
}

export const createCard = async (values: CreateCardProps) => {
  try {
    const validatedValues = InputFormSchema.safeParse(values);

    if (!validatedValues.success) {
      return { error: "Invalid Inputs" };
    }
    const { name, description, interests, githubUrl, twitterUrl } =
      validatedValues.data;
    await db.cardinfo.create({
      data: {
        userId: values.userId,
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

export const getCard = async (id: string) => {
  try {
    const data = await db.cardinfo.findMany({
      where: {
        userId: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

interface getSingleCardProps {
  id: string;
  userId: string;
}

export const getSinglecard = async ({ id, userId }: getSingleCardProps) => {
  try {
    const userData = await db.cardinfo.findUnique({
      where: {
        userId: userId,
        id: id,
      },
    });
    return userData;
  } catch (error) {
    console.log(error);
  }
};

interface DeleteProps {
  id: string;
  userId: string;
  path: string;
}

export const deleteCard = async (props: DeleteProps) => {
  try {
    await db.cardinfo.delete({
      where: {
        userId: props.userId,
        id: props.id,
      },
    });
    revalidatePath(props.path);
    return { success: "Deleted succesfully!" };
  } catch (error) {
    console.log(error);
  }
};

interface CardDataTypes {
  id: string;
  userId: string;
  name: string;
  description: string;
  interests: string[];
  githubUrl?: string;
  twitterUrl?: string;
}
interface UpdateCardProps {
  data: CardDataTypes;
}
export const updateCard = async ({ data }: UpdateCardProps) => {
  try {
    const { id, userId, name, description, interests, githubUrl, twitterUrl } =
      data;

    const updateData = await db.cardinfo.update({
      where: {
        userId: userId,
        id: id,
      },
      data: {
        name,
        description,
        interests,
        githubUrl,
        twitterUrl,
      },
    });
    revalidatePath("/dashboard");
    return updateData;
  } catch (error) {
    console.log(error);
  }
};
