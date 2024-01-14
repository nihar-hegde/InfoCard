import { getSinglecard } from "@/actions/cardinfo";
import { InputForm } from "@/components/form/InputForm";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
interface IParams {
  id: string;
}

const UpdatePage = async ({ params }: { params: IParams }) => {
  const id = params.id;
  const user = await auth();
  if (!user?.user) {
    return;
  }
  const userId = user?.user.id;
  const cardInfo = await getSinglecard({ id, userId });
  return (
    <div className="flex items-center justify-center p-20">
      {cardInfo ? (
        <Card className="shadow-md min-w-[650px]">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Update Info Card</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <InputForm type="Update" CardData={cardInfo} userId={userId} />
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdatePage;
