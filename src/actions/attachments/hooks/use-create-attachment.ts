import { usePostApiV1Attachments } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateAttachment() {
  const { showErrorToast } = useToast();

  const { mutate: createAttachment, isPending: isCreateAttachmentPending } =
    usePostApiV1Attachments({
      mutation: {
        onError: () => {
          showErrorToast({
            description:
              "Произошла ошибка при загрузке файла. Попробуйте еще раз немного позже",
          });
        },
      },
    });

  return {
    createAttachment,
    isCreateAttachmentPending,
  };
}
