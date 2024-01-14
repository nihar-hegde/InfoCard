import { ICardData } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { LogOut, PencilLine, Plus } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./auth/logout-button";

interface Props {
  data: ICardData[];
}

export const CardInfoTable = async ({ data }: Props) => {
  const userSession = await auth();
  if (!userSession) {
    return;
  }

  const imageUrl = userSession?.user?.image;
  return (
    <>
      <div className="flex items-center justify-between p-3">
        <Link
          href={"/dashboard/create"}
          className={`${buttonVariants()} flex gap-1`}
        >
          Create <Plus />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={imageUrl ? imageUrl : "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogoutButton>
                Logout <LogOut />
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Interests</TableHead>
            <TableHead>GitHubURl</TableHead>
            <TableHead>TwitterURL</TableHead>
            <TableHead>Update/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Link
                  href={`dashboard/${item.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell className="truncate">{item.description}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    Show Interests
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Interests</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.interests.map((item) => (
                      <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                {item.githubUrl ? item.githubUrl : "Not Available"}
              </TableCell>
              <TableCell>
                {item.twitterUrl ? item.twitterUrl : "Not Available"}
              </TableCell>
              <TableCell className="flex items-center justify-center gap-1">
                <Link
                  href={`/dashboard/${item.id}/update`}
                  className={buttonVariants()}
                >
                  <PencilLine className="h-4 w-4" />
                </Link>
                {userSession.user ? (
                  <DeleteButton id={item.id} userId={userSession?.user?.id} />
                ) : (
                  <p>Not logged in</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
