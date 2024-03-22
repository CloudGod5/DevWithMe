import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/services/rooms";
import { TagsList, splitTags } from "@/components/tags-list";
import { SearchBar } from "../Search-bar";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex gap-16 items-center'>
          <CardTitle className='pb-2'>{room.name}</CardTitle>
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className='flex justify-between w-full sm:gap-3 flex-wrap'>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        {room.githubRepo && (
          <Button asChild variant={"outline"}>
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
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const rooms = await getRooms(searchParams.search);

  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl'>Find Dev Rooms</h1>
        {/* <div>
          <SearchBar />
        </div> */}
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
      </div>

      <div className='mb-12'>
        <SearchBar />
      </div>

      <div className='grid grid-cols-4 gap-4'>
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
