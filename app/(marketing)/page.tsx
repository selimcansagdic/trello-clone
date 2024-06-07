import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

const MarketingPage = () => {
    return(
        <div className=" flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
            <div className="mb-4 flex items-center border shadow-sm p-5 bg-amber-100 text-amber-700 rounded-full uppercase">
                <Medal className="h-6 w-6 mr-2" />
                No 1 Task Management
            </div>
            <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
            Taskify helps helps move
            </h1>
            <div className="text-1xl md:text-3xl bg-gradient-to-r from-fuchsia-600 to-black text-white px-4 p-2 rounded-md pb-4 w-fit ">
                work forward
            </div>
        </div>
        <div className="text-sm md:text-xl text-neutral-400  mt-4 max-w-xs md:max-w-2xl text-center mx-auto ">
            Collobrate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.
        </div>
        <Button></Button>
          
        </div>
    )

}   

export default MarketingPage;