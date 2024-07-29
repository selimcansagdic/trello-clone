
import {db} from "@/lib/prismadb";
import {auth} from "@clerk/nextjs/server";

interface   BoardNavbarProps {
    id:string
}

export const BoardNavbar = async({
    id
}:  BoardNavbarProps) => {
    const { orgId } = auth();
    const board = await db.board.findUnique({
        where: {
          id,
          orgId: orgId! 
        },
      });
    return (
        <div>
        Board Navbar!
        </div>
    );
    }

    export default BoardNavbar;