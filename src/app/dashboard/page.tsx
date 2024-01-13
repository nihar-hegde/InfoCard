import { getCard } from "@/actions/cardinfo";
import { CardInfoTable } from "@/components/CardInfoTable";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
  const data = await getCard();
  return (
    <>
      <div className="flex flex-col items-center justify-center p-20">
        <div>{data ? <CardInfoTable data={data} /> : <p>Loading...</p>}</div>
      </div>
    </>
  );
};

export default DashboardPage;
