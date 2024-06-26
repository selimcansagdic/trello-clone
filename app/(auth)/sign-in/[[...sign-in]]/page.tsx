

/** @format */

import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-login bg-cover bg-center">
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="w-10 h-10 animate-spin" />
      </ClerkLoading>
    </div>
  );
}