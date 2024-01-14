import { auth } from "@/auth";
import { InputForm } from "@/components/form/InputForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreatePage = async () => {
  const user = await auth();
  if (!user?.user) {
    return;
  }
  const userId = user?.user?.id;

  return (
    <div className="flex items-center justify-center p-20">
      <Card className="shadow-md min-w-[650px]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Create Info Card</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <InputForm type="Create" userId={userId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;
