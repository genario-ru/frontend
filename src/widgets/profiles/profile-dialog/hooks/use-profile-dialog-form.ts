import { useQueryClient } from "@tanstack/react-query";
import type { RefObject } from "react";

import { useCreateProfile } from "@/actions/profiles/hooks/use-create-profile";
import { useUpdateProfile } from "@/actions/profiles/hooks/use-update-profile";
import { useCheckScroll } from "@/shared/hooks/use-check-scroll";
import { useToast } from "@/shared/hooks/use-toast";

type UseProfileDialogFormParams = {
  overlayRef: RefObject<HTMLDivElement | null>;
  onDialogClose: () => void;
};

export function useProfileDialogForm({
  overlayRef,
  onDialogClose,
}: UseProfileDialogFormParams) {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const { isScrolledToBottom } = useCheckScroll({
    elementRef: overlayRef,
    scrollOffsetBottom: 40,
  });

  const { createProfile, isCreateProfilePending } = useCreateProfile({
    onSuccess: () => {
      onDialogClose();
    },
  });

  const { updateProfile, isUpdateProfilePending } = useUpdateProfile({
    onSuccess: () => {
      onDialogClose();
    },
  });

  // const form = useAppForm({
  //   defaultValues: prepareDefaultProfileFormValues({ profile, profileTypes }),
  //   validators: {
  //     onSubmit: profile ? profileFormMatchValidateFn : profileFormValidateFn,
  //   },
  //   onSubmit: ({ value }) => {
  //     if (profile) {
  //       updateProfile({
  //         params: {
  //           profileId: profile.id,
  //           ...value,
  //         },
  //       });
  //     } else {
  //       createProfile({ params: value });
  //     }
  //   },
  // });

  // const { onFormSubmit } = useFormHandlers({ form });
  // const isLoading = isCreateProfilePending || isUpdateProfilePending;
}
