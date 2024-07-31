"use client";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { dark, experimental__simple } from "@clerk/themes";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="w-screen h-screen flex items-center justify-center  bg-cover bg-center">
      <ModeToggle />
      <ClerkLoaded>
        <SignIn
          appearance={{
            elements: {
              rootBox: {
                backgroundColor: theme === "dark" ? "neutral-800" : "white",
              },
            },
            baseTheme: theme === "dark" ? dark : experimental__simple,
          }}
        />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="w-10 h-10 animate-spin" />
      </ClerkLoading>
    </div>
  );
}
