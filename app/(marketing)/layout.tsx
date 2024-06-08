/** @format */

import Navbar from "./_components/navbar";
import Footer from "./_components/footer";


const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full ">
      <Navbar />
      <main className="pt-40 pb-20 ">{children}</main>
      <Footer/>
    </div>
  );
};

export default MarketingLayout;
