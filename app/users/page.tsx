import { getUsers } from '../lib/api';
import UserList from './UserList';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserList initialUsers={users} />
    </>
  );
}
