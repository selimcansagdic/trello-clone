import { Sidebar } from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto min-h-screen">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default OrganizationLayout;
