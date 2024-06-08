/** @format */

"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm  text-white text-3xl flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <Logo />
        <div className="space-x-4 md:block md:w-auto lg:flex items-center justify-between w-full">
          <ClerkLoaded>
            {user ? (
              <UserButton afterSignOutUrl="/sign-in" />
            ) : (
              <Button size="sm" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
            )}
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="w-6 h-6 animate-spin text-blue-700" />
          </ClerkLoading>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
