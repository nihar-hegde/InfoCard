import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICardData } from "@/types";
import { ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

interface CardInfoProps {
  data: ICardData;
}

export const CardInfo = ({ data }: CardInfoProps) => {
  const { name, description, interests, githubUrl, twitterUrl } = data;
  return (
    <>
      <Card className="min-w-[450px] max-w-[650px] shadow-md">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto p-2">
            <h1 className="text-xl mb-1 font-semibold">Interests</h1>
            <div className="grid grid-cols-2 gap-2">
              {interests.map((item) => (
                <div key={item} className="flex ">
                  <ChevronRight />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-3">
          {githubUrl ? (
            <a href={githubUrl} target="_blank">
              <FaGithub className="h-7 w-7" />{" "}
            </a>
          ) : null}
          {twitterUrl ? (
            <a href={twitterUrl} target="_blank">
              <FaXTwitter className="h-7 w-7" />{" "}
            </a>
          ) : null}
        </CardFooter>
      </Card>
    </>
  );
};
