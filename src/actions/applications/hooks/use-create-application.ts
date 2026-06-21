import { usePostApiV1Applications } from "@/codegen/api/product";

export function useCreateApplication() {
  const { mutate: createApplication, isPending: isApplicationCreating } =
    usePostApiV1Applications();

  return { createApplication, isApplicationCreating };
}
