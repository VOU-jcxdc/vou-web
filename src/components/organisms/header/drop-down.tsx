import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

import GeneratedAvatar from "@/components/molecules/generated-avatar";
import { useSignOut } from "@/hooks/react-query/useAuth";

export default function Dropdown() {
  const signOut = useSignOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <GeneratedAvatar className="h-8 w-8" name="User Avatar" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-3 w-56 bg-background">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem className="hover:cursor-pointer hover:bg-slate-50">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => signOut.mutate()}
            className="hover:cursor-pointer hover:bg-slate-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
