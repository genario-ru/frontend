import type {
  GetApiV1PlatformsQueryResponse,
  GetApiV1ProfilesTypesQueryResponse,
  GetApiV1TonesQueryResponse,
} from "@/codegen/api/product";
import { withForm } from "@/lib/tanstack-form";
import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import type { ProfileSettingsFormValues } from "../schemas/profile-settings-form-schema";

type ProfileSettingsFormFieldsProps = {
  profileTypesData: GetApiV1ProfilesTypesQueryResponse;
  tonesData: GetApiV1TonesQueryResponse;
  platformsData: GetApiV1PlatformsQueryResponse;
};

export const ProfileSettingsFormFields = withForm({
  defaultValues: {} as ProfileSettingsFormValues,
  props: {} as ProfileSettingsFormFieldsProps,
  render: ({ form, profileTypesData, tonesData, platformsData }) => {
    return (
      <Island roundedBottom={false} className="flex-1 gap-6">
        <form.AppField name="name">
          {(field) => (
            <field.InputField
              size="lg"
              label="Название профиля / канала"
              autoComplete="off"
              placeholder="Mr.Beast"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextareaField
              label="Описание профиля / канала"
              placeholder="Вся релевантная информация о вашем профиле / канале"
            />
          )}
        </form.AppField>
        <form.AppField name="targetAudience">
          {(field) => (
            <field.InputField
              size="lg"
              label="Целевая аудитория"
              autoComplete="off"
              placeholder="Мужчины и женщины в возрасте от 25 до 40 лет, имеющие интерес к катанию на горных велосипедах"
            />
          )}
        </form.AppField>
        <form.AppField name="typeId">
          {(field) => (
            <field.RadioCardsGroupField
              label="Тип профиля"
              items={profileTypesData.data.map((profileType) => ({
                label: profileType.name,
                value: profileType.id,
              }))}
              itemClassName="flex-1"
            />
          )}
        </form.AppField>
        <form.AppField name="toneIds">
          {(field) => (
            <field.CheckboxChipsField
              title="Тональность"
              items={tonesData.data.map((tone) => ({
                value: tone.id,
                children: (
                  <>
                    {tone.name}
                    {tone.icon && <LucideIcon icon={tone.icon} />}
                  </>
                ),
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="platformIds">
          {(field) => (
            <field.CheckboxChipsField
              title="Платформы"
              items={platformsData.data.map((platform) => ({
                value: platform.id,
                children: platform.name,
              }))}
            />
          )}
        </form.AppField>
      </Island>
    );
  },
});
