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
import { register } from "module";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return isLoggedIn ? (
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
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className='mr-2' /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div>
      <Button onClick={() => signIn()} variant={"ghost"}>
        <LogInIcon className='mr-2' />
        Sign In
      </Button>
      <Button onClick={() => signIn()}>
        <LogInIcon className='mr-2' />
        Sign Up
      </Button>
    </div>
  );
}

export function Header() {
  return (
    <header className='dark:bg-gray-900 bg-gray-100 container mx-auto py-2'>
      <div className='flex justify-between items-center'>
        <Link
          className='flex gap-2 items-center text-xl text-semibold hover:underline'
          href='/'
          passHref
        >
          <Image src='/logo.png' width='60' height='60' alt='logo' />
          The Rare Catch
        </Link>

        <div className='flex items-center gap-4'>
          <AccountDropdown />
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
}
