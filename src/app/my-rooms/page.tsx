import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRoomCard } from "./user-room-card";
import { getUserRooms } from "@/app/api/rooms";
import Image from "next/image";

export default async function YourRoomsPage() {
  const rooms = await getUserRooms();

  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl'>My Rooms</h1>
        {rooms.length > 0 && (
          <Button asChild>
            <Link href='/create-room'>Create Room</Link>
          </Button>
        )}
      </div>

      <div className='grid grid-cols-5 sm:grid-cols-3 md:col-span-3 gap-4'>
        {rooms.map((room) => {
          return <UserRoomCard key={room.id} room={room} />;
        })}
      </div>
      {rooms.length === 0 && (
        <div className='flex flex-col gap-4 justify-center items-center pt-12'>
          <Image src='/no-data.svg' alt='No data' width={200} height={200} />
          <h2 className='text-2xl'>Lets get started by making your own room</h2>
          <Button asChild>
            <Link href='/create-room'>Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
