import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NoRoomPageProps {
  message: string;
}

function NoRoomPage({ message }: NoRoomPageProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='mb-4 text-2xl font-semibold text-gray-800'>{message}</h1>
      <Button asChild>
        <Link href='/rooms' legacyBehavior>
          <a className='inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition'>
            Back to rooms
          </a>
        </Link>
      </Button>
    </div>
  );
}

export default NoRoomPage;
