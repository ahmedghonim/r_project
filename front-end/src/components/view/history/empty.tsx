import EmptyIcon from "@/svg/empty.svg";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";
function Empty() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-[170px]">
      <EmptyIcon />
      <Text variant="white" size="te" className="mt-8 mb-4">
        No Research History Found
      </Text>
      <Text center>
        Looks like you haven&apos;t started your research journey yet. Begin
        exploring treatments, documenting your progress, and tracking your
        discoveries to build your research history.
      </Text>
      <Link href="/start">
        <Button className="px-10 mt-6">Get Start</Button>
      </Link>
    </div>
  );
}

export default Empty;
