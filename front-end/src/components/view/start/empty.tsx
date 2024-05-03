import EmptyIcon from "@/svg/empty.svg";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

function Empty() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-red-600">
      <EmptyIcon />
      <Text variant="white" size="te">
        No Research History Found
      </Text>
      <Text>
        Looks like you haven&apos;t started your research journey yet. Begin
        exploring treatments, documenting your progress, and tracking your
        discoveries to build your research history.
      </Text>
      <Link href="/start">
        <Button>Get Start</Button>
      </Link>
    </div>
  );
}

export default Empty;
