"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function BookmarkList({ user, refresh }) {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    if (!user) return;

    fetchBookmarks();

    // realtime subscription
    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        () => {
          fetchBookmarks();
        },
      )
      .subscribe();

    // polling fallback (important)
    const interval = setInterval(fetchBookmarks, 2000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [refresh]);

  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  return (
    <div className="space-y-2">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="flex justify-between items-center border p-3"
        >
          <a href={b.url} target="_blank" className="text-blue-600">
            {b.title}
          </a>
          <button onClick={() => deleteBookmark(b.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
