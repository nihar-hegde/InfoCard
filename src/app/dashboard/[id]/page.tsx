"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface IParams {
  id: string;
}

const InfoPage = ({ params }: { params: IParams }) => {
  return (
    <div className="felx flex-col items-center justify-center p-20">
      <div>ID: {params.id}</div>
      <Link href={"/dashboard"} className={buttonVariants()}>
        Dashboard
      </Link>
    </div>
  );
};

export default InfoPage;
