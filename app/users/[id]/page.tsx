import { getUserById } from "../../lib/api";
import UserDetail from "./UserDetail";
import { notFound } from "next/navigation";
import { User } from "../../lib/types";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  let user: User | null = null;

  try {
    user = await getUserById(Number(id));
  } catch (error) {
    return notFound();
  }

  if (!user) return notFound();

  return <UserDetail user={user} />;
}
