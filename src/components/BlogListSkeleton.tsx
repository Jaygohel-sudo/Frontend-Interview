import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardSkeleton = () => {
  return (
    <Card
      className={`
        cursor-pointer shadow-md border border-white/20 
        bg-gradient-to-r from-cardLight to-cardDark rounded-xl animate-pulse
        w-[85vw] 
        md:w-[clamp(16rem,28vw,25rem)] 
        lg:w-[clamp(28rem,64vw,72rem)] 
      `}
    >
      <CardHeader className="space-y-2 p-4">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-3 w-16 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />{" "}
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </CardContent>
    </Card>
  );
};
