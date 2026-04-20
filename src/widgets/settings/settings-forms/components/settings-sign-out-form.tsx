import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { Button } from "@/shared/components/ui/button";
import { IslandSection } from "@/shared/components/ui/island";

const ISLAND_SECTION_TITLE = "Выход из аккаунта";
const ISLAND_SECTION_DESCRIPTION =
  "После выхода из аккаунта все ваши данные останутся надежно сохранены. Вы сможете войти в свой аккаунт по указанной при регистрации электронной почте";

export function SettingsSignOutForm() {
  const signOut = useSignOut();

  return (
    <IslandSection
      title={ISLAND_SECTION_TITLE}
      description={ISLAND_SECTION_DESCRIPTION}
      className="gap-4"
    >
      <Button priority="secondary" onClick={signOut}>
        Выйти из аккаунта
      </Button>
    </IslandSection>
  );
}
