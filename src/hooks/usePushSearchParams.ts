import { usePathname, useRouter } from "next/navigation";

import { generateSearchParams } from "@/services/utils";

export default function usePushSearchParams() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    newSearchParams: Record<
      string,
      string | string[] | number | boolean | undefined
    >
  ) => {
    const params = generateSearchParams(newSearchParams);
    router.push(`${pathname}?${params.toString()}`);
  };
}
