"use client";

import { Room } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TagsList } from "./tags-list";
import { Button } from "./ui/button";
import Link from "next/link";
import { splitTags } from "@/lib/utils";
import { GithubIcon } from "lucide-react";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex gap-10 sm:gap-0 items-center'>
          <CardTitle className='pb-2 pr-6 sm:pr-0'>{room.name}</CardTitle>
          {room.githubRepo && (
            <Button asChild variant={"link"}>
              <Link
                href={room.githubRepo}
                className='flex items-center gap-2 sm:gap-0 flex-wrap'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GithubIcon />
                Github Project
              </Link>
            </Button>
          )}
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className='flex justify-between w-full sm:gap-3 flex-wrap'>
        <Button asChild className='pr-8 pl-8'>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
