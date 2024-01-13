import { getSinglecard } from "@/actions/cardinfo";
import { CardInfo } from "@/components/CardInfo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface IParams {
  id: string;
}

const InfoPage = async ({ params }: { params: IParams }) => {
  const cardInfo = await getSinglecard(params.id);

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
