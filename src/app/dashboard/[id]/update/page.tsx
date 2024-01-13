import { getSinglecard } from "@/actions/cardinfo";
import { InputForm } from "@/components/form/InputForm";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface IParams {
  id: string;
}

const UpdatePage = async ({ params }: { params: IParams }) => {
  const cardInfo = await getSinglecard(params.id);
  return (
    <div className="flex items-center justify-center p-20">
      {cardInfo ? (
        <Card className="shadow-md min-w-[650px]">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Update Info Card</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <InputForm type="Update" CardData={cardInfo} />
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdatePage;
