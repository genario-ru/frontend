import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { ProfileImage } from "@/shared/components/common/profile-image";
import {
  EmptyPlug,
  EmptyPlugDescription,
  EmptyPlugHeader,
  EmptyPlugIcon,
  EmptyPlugTitle,
} from "@/shared/components/ui/empty-plug";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugHeader,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useIdeasListSettingsParamsConfigurationData } from "../hooks/use-ideas-list-settings-params-configuration-data";
import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

export const IdeasListSettingsParamsConfigurationSubform = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  render: ({ form }) => {
    const { myProfilesData, videoTypesData, tonesData, isLoading, isError } =
      useIdeasListSettingsParamsConfigurationData();

    const isDataAvailable = myProfilesData && videoTypesData && tonesData;

    if (isLoading) {
      return <IdeasListSettingsParamsConfigurationSubformSkeleton />;
    }

    if (isError) {
      return <IdeasListSettingsParamsConfigurationSubformErrorPlug />;
    }

    if (!isDataAvailable) {
      return <IdeasListSettingsParamsConfigurationSubformEmptyPlug />;
    }

    return (
      <div className="flex flex-col gap-6">
        <form.AppField
          name={`${IdeasListSettingsFormSteps.ParamsConfiguration}.videoTypeIds`}
        >
          {(field) => (
            <field.CheckboxCardsField
              title="Тип видео"
              items={videoTypesData.data.map((item) => ({
                value: item.id,
                children: item.name,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${IdeasListSettingsFormSteps.ParamsConfiguration}.profileId`}
        >
          {(field) => (
            <field.SelectField
              label="Профиль"
              itemGroups={[
                {
                  items: myProfilesData.data.map((profile) => ({
                    icon: (
                      <ProfileImage
                        size="sm"
                        alt={profile.name}
                        uuid={profile.id}
                      />
                    ),
                    label: profile.name,
                    value: profile.id,
                  })),
                },
              ]}
              buttonProps={{ size: "lg" }}
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${IdeasListSettingsFormSteps.ParamsConfiguration}.targetAudience`}
        >
          {(field) => (
            <field.InputField
              size="lg"
              label="Целевая аудитория"
              placeholder="Мужчины и женщины в возрасте до 25 лет, интересующиеся запуском дронов и съемкой на них"
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${IdeasListSettingsFormSteps.ParamsConfiguration}.toneIds`}
        >
          {(field) => (
            <field.CheckboxChipsField
              title="Тональность"
              items={tonesData.data.map((item) => ({
                value: item.id,
                children: (
                  <>
                    {item.name}
                    {item.icon && <LucideIcon icon={item.icon} />}
                  </>
                ),
              }))}
            />
          )}
        </form.AppField>
      </div>
    );
  },
});

export function IdeasListSettingsParamsConfigurationSubformSkeleton() {
  return (
    <ItemsList
      className="gap-6"
      count={5}
      item={
        <div className="flex flex-col gap-2">
          <TextSkeleton fontSize={16} lineHeight={24} className="w-20" />
          <Skeleton className="rounded-4 h-12 w-full" />
        </div>
      }
    />
  );
}

export function IdeasListSettingsParamsConfigurationSubformEmptyPlug() {
  return (
    <EmptyPlug className="flex-1">
      <EmptyPlugHeader>
        <EmptyPlugIcon />
        <EmptyPlugTitle>Нет данных</EmptyPlugTitle>
        <EmptyPlugDescription>
          Недостаточно данных для отображения формы
        </EmptyPlugDescription>
      </EmptyPlugHeader>
    </EmptyPlug>
  );
}

export function IdeasListSettingsParamsConfigurationSubformErrorPlug() {
  return (
    <ErrorPlug className="flex-1">
      <ErrorPlugHeader>
        <ErrorPlugIcon />
        <ErrorPlugTitle>Ошибка загрузки</ErrorPlugTitle>
        <ErrorPlugDescription>
          Произошла ошибка при загрузке данных. Попробуйте обновить страницу
        </ErrorPlugDescription>
      </ErrorPlugHeader>
    </ErrorPlug>
  );
}
