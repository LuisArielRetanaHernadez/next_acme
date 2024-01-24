import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 m-auto">
      <FaceFrownIcon className="W-10 text-gray-400"/>
      <h2 className="text-xl font-semibold">404 not found</h2>
      <p>Could not find the requested invoice</p>
      <Link
        href='/dashboard/invoices'
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-color hover:bg-blue-400"
      >
        Go Bakc
      </Link>
    </main>
  )
}