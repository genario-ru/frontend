import { GenerationAlert } from "@/shared/components/common/generation-alert";

import { useProfilesImportJobAlert } from "../hooks/use-profiles-import-job-alert";

export function ProfilesImportJobAlert() {
  const { hasActiveProfilesFromChannelsJob } = useProfilesImportJobAlert();

  if (!hasActiveProfilesFromChannelsJob) {
    return null;
  }

  return (
    <GenerationAlert
      title="Импорт каналов в процессе"
      description="Получаем ифнормацию о ваших каналах, анализируем целевую аудиторию и заполняем профили"
      descriptionProps={{ className: "max-w-lg" }}
    />
  );
}
