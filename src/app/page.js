"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>Not Logged In</h1>
        <button onClick={() => signIn("github")}>
          Login with GitHub
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <button onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}