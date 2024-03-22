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
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className='mr-2'>
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOutIcon className='mr-2' /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className='dark:bg-gray-900 bg-gray-100 container mx-auto py-2 z-10 relative'>
      <div className='flex justify-between items-center'>
        <Link
          className='flex gap-2 items-center text-xl text-semibold hover:underline'
          href='/'
          passHref
        >
          <Image src='/icon.png' width='60' height='60' alt='logo' />
          DevFinder
        </Link>

        <nav className='flex gap-8'>
          {!isLoggedIn && (
            <>
              <Link className='hover:underline' href='/'>
                Explore Rooms
              </Link>
              <Link className='hover:underline' href='/about'>
                About Page
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link className='hover:underline' href='/my-rooms'>
                My Rooms
              </Link>
              <Link className='hover:underline' href='/rooms/explore'>
                Explore Rooms
              </Link>
            </>
          )}
        </nav>

        <div className='flex items-center gap-4'>
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant={"link"}>
              <LogInIcon className='mr-2' />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
