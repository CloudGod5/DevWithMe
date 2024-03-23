import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/app/api/rooms";
import { SearchBar } from "../../../components/Search-bar";
import { RoomCard } from "@/components/room-card";
import Image from "next/image";

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
      </div>

      <div className='grid grid-cols-4 gap-4'>
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
      {rooms.length === 0 && (
        <div className='flex flex-col gap-4 justify-center items-center pt-12'>
          <Image src='/no-data.svg' alt='No data' width={200} height={200} />
          <h2 className='text-2xl'>No rooms available to join</h2>
        </div>
      )}
    </main>
  );
}
