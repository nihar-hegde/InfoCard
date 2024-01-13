import { ICardData } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

interface Props {
  data: ICardData[];
}

export const CardInfoTable = ({ data }: Props) => {
  return (
    <>
      <Link
        href={"/dashboard/create"}
        className={`${buttonVariants()} flex gap-1`}
      >
        Create <Plus />
      </Link>
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
                <DeleteButton id={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
