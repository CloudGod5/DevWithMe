import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/app/api/rooms";
import { SearchBar } from "../../../components/Search-bar";
import { RoomCard } from "@/components/room-card";

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
        <div className=' flex justify-center'>
          <SearchBar />
        </div>
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
      </div>

      <div className='grid grid-cols-5 gap-4'>
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
