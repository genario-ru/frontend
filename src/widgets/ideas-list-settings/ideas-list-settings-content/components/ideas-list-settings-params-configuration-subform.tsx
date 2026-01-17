import { withForm } from "@/lib/tanstack-form";
import { ProfileImage } from "@/shared/components/common/profile-image";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

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

    const dataNotAvailable = !myProfilesData || !videoTypesData || !tonesData;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    if (dataNotAvailable) {
      return <></>;
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
