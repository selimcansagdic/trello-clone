// import {  SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return <SignUp/>;
// }

import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="w-10 h-10 animate-spin" />
      </ClerkLoading>
    </div>
  );
}