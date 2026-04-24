import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Bevysquare CRUD App</h1>
      <p className="text-gray-600 mb-6">Simple User Management Assignment</p>
      <Link
        href="/users"
        className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
      >
        Go to Users List
      </Link>
    </div>
  );
}
