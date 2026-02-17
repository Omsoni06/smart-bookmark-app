"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import BookmarkForm from "../../components/BookmarkForm";
import BookmarkList from "../../components/BookmarkList";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/");
      else setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const triggerRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Bookmarks</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <BookmarkForm user={user} onAdd={triggerRefresh} />
      <BookmarkList user={user} refresh={refresh} />
    </div>
  );
}
