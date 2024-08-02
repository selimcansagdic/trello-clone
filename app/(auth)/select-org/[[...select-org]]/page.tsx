import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <OrganizationList hidePersonal afterSelectOrganizationUrl="/organization/:id" afterCreateOrganizationUrl="/organization/:id" />
    </div>
  );
}
