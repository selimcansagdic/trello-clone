"use client";
import { useState, useEffect } from "react";
import { FormPopover } from "@/components/form/form-popover";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("@/components/ui/calendar").then((mod) => mod.Calendar), { ssr: false });

export const Navbar = () => {
  const { theme } = useTheme();
  const [dateTime, setDateTime] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setDateTime(`${formattedDate} ${formattedTime}`);
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const calendarClassName = theme === "dark" ? "calendar-dark" : "";

  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm dark:bg-neutral-900 bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex p-6">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button variant="primary" size="sm" className="rounded-sm block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-4">
        <ModeToggle />
        <OrganizationSwitcher
          hidePersonal={true}
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              organizationSwitcherTrigger: {
                color: theme === "dark" ? "white" : "#000",
                "&:hover": {
                  color: theme === "dark" ? "#798800" : "#000",
                },
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
        <div className="flex items-center gap-x-2">
          {dateTime && (
            <Button variant="ghost" onClick={toggleCalendar}>
              {dateTime}
            </Button>
          )}
        </div>
        {showCalendar && (
          <div className={`absolute top-16 right-4 ${calendarClassName}`}>
            <Calendar />
          </div>
        )}
      </div>
    </nav>
  );
};
