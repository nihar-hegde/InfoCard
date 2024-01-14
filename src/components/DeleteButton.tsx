"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteCard } from "@/actions/cardinfo";
import { usePathname } from "next/navigation";

interface DeleteButtonProps {
  id: string;
  userId: string;
}
export const DeleteButton = (props: DeleteButtonProps) => {
  const { id, userId } = props;
  const [deleteing, setDeleting] = useState(false);
  const path = usePathname();
  const handleOnClick = async () => {
    try {
      setDeleting(true);
      await deleteCard({ id, userId, path });
      setDeleting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Button
      disabled={deleteing}
      variant={"destructive"}
      onClick={handleOnClick}
    >
      {deleteing ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
};
