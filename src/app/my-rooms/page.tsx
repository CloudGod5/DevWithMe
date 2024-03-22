import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRoomCard } from "./user-room-card";
import { getUserRooms } from "@/app/api/rooms";

export default async function YourRoomsPage() {
  const rooms = await getUserRooms();

  return (
    <main className='min-h-screen p-16'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl'>My Rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
      </div>

      <div className='grid grid-cols-5 sm:grid-cols-3 md:col-span-3 gap-4'>
        {rooms.map((room) => {
          return <UserRoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
