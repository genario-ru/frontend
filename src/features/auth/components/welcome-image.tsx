import { Skeleton } from "@/shared/components/ui/skeleton";

export const WelcomeImage = () => {
  return <Skeleton className="rounded-4 size-full flex-1" />;

  // return (
  //   <Image
  //     src="/images/auth/welcome.png"
  //     alt="Welcome"
  //     width={100}
  //     height={100}
  //   />
  // );
};
