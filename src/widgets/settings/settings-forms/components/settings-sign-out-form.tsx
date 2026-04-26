import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { Button } from "@/shared/components/ui/button";
import { IslandSection } from "@/shared/components/ui/island";

const ISLAND_SECTION_TITLE = "Выход из аккаунта";
const ISLAND_SECTION_DESCRIPTION =
  "Все ваши данные останутся надежно сохранены. Вы сможете войти в свой аккаунт по указанной при привязанной электронной почте";

export function SettingsSignOutForm() {
  const signOut = useSignOut();

  return (
    <IslandSection
      title={ISLAND_SECTION_TITLE}
      description={ISLAND_SECTION_DESCRIPTION}
      className="gap-4"
    >
      <Button
        priority="secondary"
        className="w-full md:w-fit"
        onClick={signOut}
      >
        Выйти из аккаунта
      </Button>
    </IslandSection>
  );
}
