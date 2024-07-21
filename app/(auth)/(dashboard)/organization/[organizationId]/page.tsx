/** @format */

import { create } from "@/actions/create-Board";
import { Button } from "@/components/ui/button";

// "use client";


const OrganizationPage = () => {
  

  return (
    <div>
      <form action={create}>
        <input id="title" name="title" required placeholder="Enter a board tittle" className="border-black border p-1" />
        <Button type="submit" className="bg-blue-500 text-white p-1">Create Board</Button>
      </form>
    </div>
  );
};

export default OrganizationPage;
