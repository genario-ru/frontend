import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { ProfileImage } from "@/shared/components/common/profile-image";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useScenarioSettingsParamsConfigurationData } from "../hooks/use-scenario-settings-params-configuration-data";
import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

export const ScenarioSettingsParamsConfigurationSubform = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  render: ({ form }) => {
    const {
      myProfilesData,
      videoTypesData,
      videoDurationsData,
      platformsData,
      tonesData,
      isLoading,
      isError,
    } = useScenarioSettingsParamsConfigurationData();

    const isDataAvailable =
      myProfilesData &&
      videoTypesData &&
      videoDurationsData &&
      platformsData &&
      tonesData;

    if (isLoading) {
      return <ScenarioSettingsParamsConfigurationSubformSkeleton />;
    }

    if (isError) {
      return <ScenarioSettingsParamsConfigurationSubformErrorPlug />;
    }

    if (!isDataAvailable) {
      return <ScenarioSettingsParamsConfigurationSubformEmptyPlug />;
    }

    return (
      <div className="flex flex-col gap-6">
        <form.AppField
          name={`${ScenarioSettingsFormSteps.ParamsConfiguration}.videoTypeId`}
        >
          {(field) => (
            <field.SelectField
              label="Тип видео"
              itemGroups={[
                {
                  items: videoTypesData.data.map((item) => ({
                    value: item.id,
                    icon: item.icon && <LucideIcon icon={item.icon} />,
                    label: item.name,
                    description: item.description,
                  })),
                },
              ]}
              buttonProps={{ size: "lg" }}
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${ScenarioSettingsFormSteps.ParamsConfiguration}.videoDurationId`}
        >
          {(field) => (
            <field.SelectField
              label="Продолжительность видео"
              itemGroups={[
                {
                  items: videoDurationsData.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                    description: item.description,
                  })),
                },
              ]}
              buttonProps={{ size: "lg" }}
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${ScenarioSettingsFormSteps.ParamsConfiguration}.profileId`}
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
          name={`${ScenarioSettingsFormSteps.ParamsConfiguration}.targetAudience`}
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
          name={`${ScenarioSettingsFormSteps.ParamsConfiguration}.platformIds`}
        >
          {(field) => (
            <field.CheckboxChipsField
              title="Платформы"
              items={platformsData.data.map((platform) => ({
                value: platform.id,
                children: platform.name,
              }))}
              itemProps={{
                size: "lg",
                className: "w-full md:w-fit",
              }}
              className="flex-col md:flex-row"
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${ScenarioSettingsFormSteps.ParamsConfiguration}.toneIds`}
        >
          {(field) => (
            <field.CheckboxChipsField
              title="Тональность"
              defaultMaxVisibleItems={6}
              items={tonesData.data.map((item) => ({
                value: item.id,
                children: (
                  <>
                    {item.name}
                    {item.icon && <LucideIcon icon={item.icon} />}
                  </>
                ),
              }))}
              itemProps={{
                size: "lg",
                className: "w-full md:w-fit",
              }}
              className="flex-col md:flex-row"
            />
          )}
        </form.AppField>
      </div>
    );
  },
});

export function ScenarioSettingsParamsConfigurationSubformSkeleton() {
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

export function ScenarioSettingsParamsConfigurationSubformEmptyPlug() {
  return (
    <Plug
      className="flex-1"
      title="Нет данных"
      description="Недостаточно данных для отображения формы"
    />
  );
}

export function ScenarioSettingsParamsConfigurationSubformErrorPlug() {
  return (
    <Plug
      variant="negative"
      title="Ошибка загрузки"
      description="Произошла ошибка при загрузке данных. Попробуйте обновить страницу"
      className="flex-1"
    />
  );
}
