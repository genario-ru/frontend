import type { RefObject } from "react";

import { withForm } from "@/lib/tanstack-form";
import { ProfileImage } from "@/shared/components/common/profile-image";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import { useScenarioDialogParamsConfigurationData } from "../hooks/use-scenario-dialog-params-configuration-data";
import {
  type ScenarioDialogFormSchema,
  ScenarioDialogFormSteps,
} from "../utils/scenario-dialog-form-helpers";

type ScenarioDialogParamsConfigurationSubformProps = {
  dialogContentRef: RefObject<HTMLDivElement | null>;
};

export const ScenarioDialogParamsConfigurationSubform = withForm({
  defaultValues: {} as ScenarioDialogFormSchema,
  props: {} as ScenarioDialogParamsConfigurationSubformProps,
  render: ({ form, dialogContentRef }) => {
    const {
      myProfilesData,
      videoTypesData,
      videoDurationsData,
      platformsData,
      tonesData,
      isLoading,
      isError,
    } = useScenarioDialogParamsConfigurationData();

    const dataNotAvailable =
      !myProfilesData ||
      !videoTypesData ||
      !videoDurationsData ||
      !platformsData ||
      !tonesData;

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
          name={`${ScenarioDialogFormSteps.ParamsConfiguration}.videoTypeId`}
        >
          {(field) => (
            <field.SelectField
              portalContainerRef={dialogContentRef}
              label="Тип видео"
              itemGroups={[
                {
                  items: videoTypesData.data.map((item) => ({
                    value: item.id,
                    icon: item.icon ? (
                      <LucideIcon icon={item.icon} />
                    ) : undefined,
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
          name={`${ScenarioDialogFormSteps.ParamsConfiguration}.videoDurationId`}
        >
          {(field) => (
            <field.SelectField
              portalContainerRef={dialogContentRef}
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
          name={`${ScenarioDialogFormSteps.ParamsConfiguration}.platformId`}
        >
          {(field) => (
            <field.SelectField
              portalContainerRef={dialogContentRef}
              label="Платформа"
              itemGroups={[
                {
                  items: platformsData.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })),
                },
              ]}
              buttonProps={{ size: "lg" }}
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${ScenarioDialogFormSteps.ParamsConfiguration}.profileId`}
        >
          {(field) => (
            <field.SelectField
              portalContainerRef={dialogContentRef}
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
          name={`${ScenarioDialogFormSteps.ParamsConfiguration}.targetAudience`}
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
          name={`${ScenarioDialogFormSteps.ParamsConfiguration}.toneIds`}
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
