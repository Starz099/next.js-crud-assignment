"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserUpdateInput } from "../../lib/types";
import { updateUser, deleteUser } from "../../lib/api";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <p className="py-1 border-b border-gray-50 last:border-0">
    <strong className="inline-block w-24 text-gray-600">{label}:</strong>{" "}
    {value}
  </p>
);

export default function UserDetail({ user: initialUser }: { user: User }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [formData, setFormData] = useState<UserUpdateInput>({
    name: initialUser.name,
    email: initialUser.email,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const prev = user;
    setUser({ ...user, ...formData }); // Optimistic user update
    setIsEditing(false);

    try {
      await updateUser(user.id, formData);
    } catch {
      alert("Error: Reverting changes");
      setUser(prev);
      setFormData({ name: prev.name, email: prev.email });
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete?")) return;
    try {
      await deleteUser(user.id);
      router.push("/users");
    } catch {
      alert("Delete failed");
    }
  };

  if (isEditing) {
    const fields: (keyof UserUpdateInput)[] = ["name", "email"];

    return (
      <form
        onSubmit={handleUpdate}
        className="max-w-md space-y-4 border p-6 rounded"
      >
        <h2 className="font-bold text-lg mb-4">Edit Profile</h2>
        {fields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-bold capitalize">
              {field}
            </label>
            <input
              value={formData[field]}
              type={field === "email" ? "email" : "text"}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded text-sm"
              required
            />
          </div>
        ))}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="border border-gray-200 rounded p-6 shadow-sm">
      <div className="space-y-2 mb-6">
        <InfoRow label="Name" value={user.name} />
        <InfoRow label="Email" value={user.email} />

        {showMore && (
          <div className="mt-4 pt-4 border-t bg-gray-50 p-4 rounded animate-in fade-in duration-300">
            <InfoRow label="Phone" value={user.phone} />
            <InfoRow label="Website" value={user.website} />
            <InfoRow label="Company" value={user.company.name} />
            <InfoRow
              label="Address"
              value={`${user.address.street}, ${user.address.city}`}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-black text-white rounded text-sm"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 border border-red-500 text-red-500 rounded text-sm hover:bg-red-50"
        >
          Delete
        </button>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm underline ml-auto"
        >
          {showMore ? "Show Less" : "View Full Details"}
        </button>
      </div>
    </div>
  );
}
