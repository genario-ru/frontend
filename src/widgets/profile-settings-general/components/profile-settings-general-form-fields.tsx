import type {
  GetPlatformsResponseSchema,
  GetProfileTypesResponseSchema,
} from "@/codegen/api/product";
import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { FieldLayout } from "@/shared/components/layouts/field-layout";
import {
  CheckboxChipsGroup,
  CheckboxChipsGroupItem,
} from "@/shared/components/ui/checkbox-chips-group";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import type { ProfileSettingsGeneralFormValues } from "../schemas/profile-settings-general-form-schema";

type ProfileSettingsGeneralFormFieldsProps = {
  profileTypesData: GetProfileTypesResponseSchema;
  platformsData: GetPlatformsResponseSchema;
};

export const ProfileSettingsGeneralFormFields = withForm({
  defaultValues: {} as ProfileSettingsGeneralFormValues,
  props: {} as ProfileSettingsGeneralFormFieldsProps,
  render: ({ form, profileTypesData, platformsData }) => {
    return (
      <div className="flex flex-col gap-6">
        <form.AppField name="name">
          {(field) => (
            <field.InputField
              size="lg"
              label="Название"
              autoComplete="off"
              placeholder="Мои новые крутые идеи..."
            />
          )}
        </form.AppField>
        <form.AppField name="typeId">
          {(field) => (
            <FieldLayout
              labelText="Тип профиля"
              message={field.state.meta.errors[0]}
            >
              <RadioCardsGroup
                value={field.state.value}
                onValueChange={field.handleChange}
                className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
              >
                {profileTypesData.data.map((profileType) => (
                  <RadioCardsGroupItem
                    key={profileType.id}
                    value={profileType.id}
                    state={
                      field.state.meta.errors.length > 0 ? "error" : "default"
                    }
                    className="flex w-full items-start gap-3 p-4 text-left"
                  >
                    {profileType.name}
                  </RadioCardsGroupItem>
                ))}
              </RadioCardsGroup>
            </FieldLayout>
          )}
        </form.AppField>
        <form.AppField name="platformIds">
          {(field) => (
            <FieldLayout
              labelText="Платформы"
              message={field.state.meta.errors[0]}
            >
              <CheckboxChipsGroup className="flex-col md:flex-row">
                {platformsData.data.map((platform) => {
                  const isChecked = field.state.value.includes(platform.id);

                  return (
                    <CheckboxChipsGroupItem
                      key={platform.id}
                      size="lg"
                      className="w-full md:w-fit"
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (checked && !isChecked) {
                          field.pushValue(platform.id);
                        }

                        if (!checked && isChecked) {
                          const platformIndex = field.state.value.indexOf(
                            platform.id,
                          );

                          field.removeValue(platformIndex);
                        }
                      }}
                    >
                      {platform.name}
                    </CheckboxChipsGroupItem>
                  );
                })}
              </CheckboxChipsGroup>
            </FieldLayout>
          )}
        </form.AppField>
        <form.AppField name="positioning">
          {(field) => (
            <field.TextareaField
              label="Позиционирование"
              placeholder="Идеи для видео, которые смогут подстегнуть интерес моей аудитории к каналу и темам, которые я на нем освещаю..."
              className="min-h-40"
            />
          )}
        </form.AppField>
        <form.AppField name="targetAudience">
          {(field) => (
            <field.TextareaField
              label="Целевая аудитория"
              placeholder="Мужчины и женщины в возрасте от 18 до 25, которые решили избрать для себя путь..."
              className="min-h-40"
            />
          )}
        </form.AppField>
        <form.AppField name="additionalInfo">
          {(field) => (
            <field.TextareaField
              label="Дополнительная информация"
              placeholder="Любая дополнительная информация, которая должна учитываться при работе с этим каналом..."
              className="min-h-40"
            />
          )}
        </form.AppField>
      </div>
    );
  },
});

const profileSettingsGeneralFormFieldsSkeletonCount = 6;
const profileSettingsGeneralFormTextareaFieldsSkeletonCount =
  profileSettingsGeneralFormFieldsSkeletonCount - 1;

export function ProfileSettingsGeneralFormFieldsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <ItemsList
        count={1}
        item={
          <div className="flex flex-col gap-2">
            <TextSkeleton fontSize={16} lineHeight={24} className="w-40" />
            <Skeleton className="rounded-4 h-14" />
          </div>
        }
      />
      <ItemsList
        count={profileSettingsGeneralFormTextareaFieldsSkeletonCount}
        gap={24}
        item={
          <div className="flex flex-col gap-2">
            <TextSkeleton fontSize={16} lineHeight={24} className="w-40" />
            <Skeleton className="rounded-4 h-40" />
          </div>
        }
      />
    </div>
  );
}
