"use client";

import { Room } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagsList } from "@/components/tags-list";
import Link from "next/link";
import { splitTags } from "@/lib/utils";
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteRoomAction } from "../api/actions";

export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex gap-10 items-center'>
          <CardTitle className='pb-2 pr-6'>{room.name}</CardTitle>
          {room.githubRepo && (
            <Button asChild variant={"link"} className='pr-0'>
              <Link
                href={room.githubRepo}
                className='flex items-center gap-2'
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
      <CardFooter className='flex gap-2'>
        <Button className='pr-8 pl-8' asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <Button>
          <Link href={`/my-rooms/edit-room/${room.id}`} className='flex gap-1'>
            <PencilIcon className='w-4 h-4 mr-2' />
            Edit
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} onClick={() => {}}>
              <TrashIcon className='w-4 h-4 mr-2' />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and any associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
