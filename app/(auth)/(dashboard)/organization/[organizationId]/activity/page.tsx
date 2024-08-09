import { Suspense, useEffect, useState } from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import { checkSubscription } from "@/lib/subscription";

const ActivityPage = () => {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      const result = await checkSubscription();
      setIsPro(result);
    };

    fetchSubscription();
  }, []);

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

export default ActivityPage;