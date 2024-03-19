"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Avatar className='mr-2'>
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className='mr-2' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className='mr-2' /> Settings
        </DropdownMenuItem>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className='mr-2' /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className='mr-2' /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  return (
    <header className='dark:bg-gray-900 bg-gray-100 container mx-auto py-4'>
      <div className='flex justify-between items-center'>
        <div>
          <Link href='/' passHref>
            <Image src='/logo.png' width='60' height='60' alt='logo' />
          </Link>
        </div>

        <div>
          <h1 className='text-4xl font-bold text-center text-blue-700 py-2'>
            The Rare Catch
          </h1>
        </div>

        <div className='flex items-center gap-4'>
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
