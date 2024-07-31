"use client";
/** @format */
import { FormPopover } from "@/components/form/form-popover";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { theme } = useTheme();
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
      <div className="ml-auto flex items-center gap-x-2">
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
      </div>
    </nav>
  );
};
