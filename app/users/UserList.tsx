"use client";

import Link from "next/link";
import { User } from "../lib/types";

export default function UserList({ initialUsers }: { initialUsers: User[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {initialUsers.map((user) => (
        <div
          key={user.id}
          className="p-4 border border-gray-300 rounded flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <Link
            href={`/users/${user.id}`}
            className="px-4 py-2 border border-black hover:bg-gray-100 rounded text-sm"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
