"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function BookmarkForm({ user, onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    if (!error) {
      setTitle("");
      setUrl("");
      onAdd(); // trigger UI refresh
    }
  };

  return (
    <form onSubmit={addBookmark} className="mb-6 space-y-2">
      <input
        className="w-full border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full border p-2"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Bookmark
      </button>
    </form>
  );
}
