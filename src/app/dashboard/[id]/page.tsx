import { getSinglecard } from "@/actions/cardinfo";
import { auth } from "@/auth";
import { CardInfo } from "@/components/CardInfo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface IParams {
  id: string;
}

const InfoPage = async ({ params }: { params: IParams }) => {
  const id = params.id;
  const user = await auth();
  if (!user?.user) {
    return;
  }
  const userId = user?.user.id;
  const cardInfo = await getSinglecard({ id, userId });

  return (
    <div className="felx flex-col items-center justify-center p-20">
      <div className="flex  flex-col items-center justify-center gap-5">
        <Link href={"/dashboard"} className={buttonVariants()}>
          Go to Dashboard
        </Link>
        <div className="felx items-center justify-center">
          {cardInfo ? <CardInfo data={cardInfo} /> : <p>Loading..</p>}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
