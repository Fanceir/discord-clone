import { Button } from "@/components/ui/button";
import { Imprima } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
const state = true;

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
}
