import { Suspense } from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import { checkSubscription } from "@/lib/subscription";

interface ActivityPageProps {
  isPro: boolean;
}

const ActivityPage = ({ isPro }: ActivityPageProps) => {
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export async function getServerSideProps() {
  const isPro = await checkSubscription();
  return {
    props: {
      isPro,
    },
  };
}

export default ActivityPage;