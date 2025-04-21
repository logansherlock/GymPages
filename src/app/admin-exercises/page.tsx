"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]); // Ensure it's an array

  useEffect(() => {
    fetch("/api/editUsers")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data); // Debugging log
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="m-5">
      <h1>Users</h1>
      {users.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-stone-600 text-stone-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">id</th>
              <th className="px-4 py-2 border border-gray-300">email</th>
              <th className="px-4 py-2 border border-gray-300">username</th>
              <th className="px-4 py-2 border border-gray-300">first name</th>
              <th className="px-4 py-2 border border-gray-300">last name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id} className={index % 2 === 0 ? "bg-stone-400" : "bg-stone-500"}>
                <td className="px-4 py-1.5 border border-gray-300 text-center font-bold">
                  {user.user_id}
                </td>
                <td className="px-4 py-1.5 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-1.5 border border-gray-300">
                  {user.username}
                </td>
                <td className="px-4 py-1.5 border border-gray-300">
                  {user.firstname}
                </td>
                <td className="px-4 py-1.5 border border-gray-300">
                  {user.lastname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
