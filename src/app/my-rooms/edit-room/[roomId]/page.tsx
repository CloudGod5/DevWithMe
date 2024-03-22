import { getRoom } from "@/app/api/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  unstable_noStore();
  const room = await getRoom(params.roomId);
  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className='container ax-auto flex flex-col gap-8 pt-12 pb-24'>
      <h1 className='text-4xl font-bold'>Create Room</h1>

      <EditRoomForm room={room} />
    </div>
  );
}
