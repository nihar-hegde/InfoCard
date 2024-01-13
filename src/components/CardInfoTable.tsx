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
import { buttonVariants } from "./ui/button";

interface Props {
  data: ICardData[];
}

export const CardInfoTable = ({ data }: Props) => {
  console.log(data);
  return (
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
            <TableCell>{item.name}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
