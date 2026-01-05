import type { RefObject } from "react";

import type {
  GetApiV1PlatformsResponse,
  GetApiV1ProfilesProfileIdResponse,
  GetApiV1ProfilesTypesResponse,
  GetApiV1TonesResponse,
} from "@/codegen/api/product/types.gen";
import { Button } from "@/shared/components/ui/button";
import {
  DialogBody,
  DialogClose,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/utils/cn";

import { useProfileDialogForm } from "../hooks/use-profile-dialog-form";

type ProfileFormProps = {
  profileData: GetApiV1ProfilesProfileIdResponse | undefined;
  profileTypesData: GetApiV1ProfilesTypesResponse;
  tonesData: GetApiV1TonesResponse;
  platformsData: GetApiV1PlatformsResponse;
  overlayRef: RefObject<HTMLDivElement | null>;
  onDialogClose: () => void;
};

export const ProfileDialogForm = ({
  profileData,
  profileTypesData,
  tonesData,
  platformsData,
  overlayRef,
  onDialogClose,
}: ProfileFormProps) => {
  const { form, isLoading, isScrolledToBottom, onFormSubmit } =
    useProfileDialogForm({
      overlayRef,
      profileData,
      profileTypesData,
      onDialogClose,
    });

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col">
      <DialogBody>
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
              placeholder="Мужчины и женщины в возврасте от 25 до 40 лет, имеющие интерес к катанию на горных велосипедах"
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
            />
          )}
        </form.AppField>
        <form.AppField name="toneIds">
          {(field) => (
            <field.CheckboxChipsField
              title="Тональность"
              items={tonesData.data.map((tone) => ({
                value: tone.id,
                children: tone.name,
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
      </DialogBody>
      <DialogFooter
        className={cn("sticky -bottom-10 z-1 duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        <DialogClose asChild>
          <Button size="lg" type="button">
            Отмена
          </Button>
        </DialogClose>
        <form.AppForm>
          <form.SubmitButton
            size="lg"
            state={isLoading ? "loading" : "default"}
            className="ml-auto"
          >
            {profileData ? "Сохранить" : "Создать профиль"}
          </form.SubmitButton>
        </form.AppForm>
      </DialogFooter>
    </form>
  );
};
