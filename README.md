# Smart Bookmark App

A simple bookmark manager built with Next.js and Supabase.

## Live Demo
https://smart-bookmark-app-flame-ten.vercel.app

## Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS

## Features
- Google OAuth login
- Add bookmarks (title + URL)
- Delete bookmarks
- Private bookmarks per user using Supabase RLS
- Real-time style updates across tabs
- Deployed on Vercel

## Problems Faced & Solutions

### 1. Bookmark insert not working
**Problem:** Insert operations were blocked.  
**Cause:** Row Level Security (RLS) not configured.  
**Solution:** Added select, insert, and delete policies using `auth.uid()`.

---

### 2. UI not updating after adding bookmark
**Problem:** Bookmark appeared only after refresh.  
**Cause:** UI was not re-fetching data after insert.  
**Solution:** Added a refresh trigger from the form to the list.

---

### 3. Realtime not working on localhost
**Problem:** WebSocket connection failed during local testing.  
**Solution:** Implemented Supabase realtime and added a polling fallback to ensure updates across tabs.

---

### 4. Google login redirecting to localhost in production
**Problem:** After login, users were redirected to localhost.  
**Cause:** Supabase Site URL was set to localhost.  
**Solution:** Updated Site URL to the Vercel domain.


