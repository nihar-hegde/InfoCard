import { getCard } from "@/actions/cardinfo";
import { auth } from "@/auth";
import { CardInfoTable } from "@/components/CardInfoTable";

import React from "react";

const DashboardPage = async () => {
  const user = await auth();
  if (!user?.user) {
    return <div>Not logged in</div>;
  }
  const id = user.user.id;
  const data = await getCard(id);
  return (
    <>
      <div className="flex flex-col items-center justify-center p-20">
        <div>{data ? <CardInfoTable data={data} /> : <p>Loading...</p>}</div>
      </div>
    </>
  );
};

export default DashboardPage;
