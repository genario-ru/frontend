import { ProfileSettingsReferenceDeleteDialog } from "@/features/profile-settings-references/profile-settings-reference-delete/components/profile-settings-reference-delete-dialog";
import { ProfileSettingsReferenceDeleteDrawer } from "@/features/profile-settings-references/profile-settings-reference-delete/components/profile-settings-reference-delete-drawer";

type ProfileSettingsReferenceDeleteConfirmationProps = {
  isMobile: boolean;
  title: string;
  description: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function ProfileSettingsReferenceDeleteConfirmation({
  isMobile,
  title,
  description,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: ProfileSettingsReferenceDeleteConfirmationProps) {
  if (isMobile) {
    return (
      <ProfileSettingsReferenceDeleteDrawer
        title={title}
        description={description}
        isOpen={isOpen}
        isPending={isPending}
        setIsOpen={setIsOpen}
        onConfirm={onConfirm}
      />
    );
  }

  return (
    <ProfileSettingsReferenceDeleteDialog
      title={title}
      description={description}
      isOpen={isOpen}
      isPending={isPending}
      setIsOpen={setIsOpen}
      onConfirm={onConfirm}
    />
  );
}
