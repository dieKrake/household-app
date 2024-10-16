import { useFormStatus } from "react-dom";
import { Button } from "@/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
