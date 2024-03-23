"use server";

import { getSession } from "@/lib/auth";
import { deleteRoom, getRoom } from "./rooms";
import { revalidatePath } from "next/cache";
import { deleteUser } from "./users";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  await deleteRoom(roomId);
  revalidatePath("/my-rooms");
}

export async function deleteAccountAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to delete your account.");
  }

  await deleteUser(session.user.id);
}
