import { getRoom } from "@/services/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import NoRoomPage from "@/app/rooms/noRoomPage";
import { TagsList } from "@/components/tags-list";
import { DevFinderVideo } from "./video-player";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;

  function isUuid(roomId: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      roomId
    );
  }
  if (!isUuid(roomId)) {
    return <NoRoomPage message='Invalid room ID' />;
  }

  const room = await getRoom(roomId);
  if (!room) {
    return <NoRoomPage message='Room not found' />;
  }

  return (
    <div className='grid grid-cols-4 min-h-screen'>
      <div className='col-span-3 p-4 pr-2'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4'>
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className='col-span-1 p-4 pl-4'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4'>
          <h1 className='text-base'>{room.name}</h1>
          <p className='text-base text-gray-400'>{room.description}</p>
          <TagsList tags={splitTags(room.tags)} />
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className='flex items-center gap-2 text-center text-sm'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
function isUuid(roomId: string) {
  throw new Error("Function not implemented.");
}
