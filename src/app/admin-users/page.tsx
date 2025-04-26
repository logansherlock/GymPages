"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]); // Ensure it's an array
  const [users_loading, setUsersLoading] = useState(true);
  const { isLoggedIn, username, userID, membership } = useAuth();

  const handleDeleteUser = async (user_id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/users/${user_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.user_id !== user_id)
        );
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data); // Debugging log
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Expected an array but got:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setUsersLoading(false);
      });
  }, []);

  return (
    <div className="m-12 mt-10">
      {isLoggedIn && userID === 0 ? (
        <div className=" bg-stone-500 border-black border-[2px]">
          <div className="flex flex-wrap m-2  font-mono text-white m-1 ">
            <div
              className="flex flex-wrap items-center max-w-s m-1 text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              USERS
            </div>
          </div>
          <div className="flex flex-wrap justify-center mx-5 mb-5">
            {users.length > 0 ? (
              <table className="w-full table-auto">
                <thead className="bg-stone-600 text-stone-100 ">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">user_id</th>
                    <th className="px-4 py-2 border border-gray-300">
                      username
                    </th>
                    <th className="px-4 py-2 border border-gray-300">email</th>
                    <th className="px-4 py-2 border border-gray-300">
                      first name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      last name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      functions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.user_id}
                      className={
                        index % 2 === 0 ? "bg-stone-400" : "bg-neutral-500"
                      }
                    >
                      <td className="px-4 py-1.5 border border-gray-300 text-center font-bold">
                        {user.user_id}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {user.username}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {user.firstname}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {user.lastname}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300 text-center font-bold">
                        <Link
                          href={`/admin-users/${user.user_id}`}
                          className="bg-yellow-500 text-white h-6 px-1 py-[3px] text-sm rounded hover:bg-yellow-600 mr-3 border-black border-[1px]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteUser(user.user_id)}
                          className="bg-red-600 text-white h-6 px-1 text-sm rounded hover:bg-red-700 border-black border-[1px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
            <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
              <Link
                href={`/`}
                className="text-white text-4xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←
              </Link>{" "}
              back to home
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-1 ml-auto text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              USERS
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div
                className="w-full max-w-s m-4 text-center text-4xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to view user history.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div
                className="w-full max-w-s m-4 text-center text-4xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be admin to view user history.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
