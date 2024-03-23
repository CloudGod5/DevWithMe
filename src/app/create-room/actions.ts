"use server";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createRoom } from "@/app/api/rooms";

export async function CreateRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("You must be logged in to create a room.");
  }
  const room = await createRoom(session.user.id, roomData);

  revalidatePath("/my-rooms");

  return room;
}
