// import { useQueryClient } from "@tanstack/react-query";
// import { RefObject } from "react";

// import { Platform } from "@/entities/platforms/schemas/primary-schema";
// import { ProfileType } from "@/entities/profile-types/schemas/primary-schema";
// import { useCreateProfileMutation } from "@/entities/profiles/mutations/create-profile-mutation";
// import { useUpdateProfileMutation } from "@/entities/profiles/mutations/update-profile-mutation";
// import {
//   myProfilesQueryKey,
//   profileQueryKey,
// } from "@/entities/profiles/query-keys";
// import { ProfileExtended } from "@/entities/profiles/schemas/primary-schema";
// import { Tone } from "@/entities/tones/schemas/primary-schema";
// import { useAppForm } from "@/lib/tanstack-form";
// import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
// import { Button } from "@/shared/components/ui/button";
// import {
//   DialogBody,
//   DialogClose,
//   DialogFooter,
// } from "@/shared/components/ui/dialog";
// import { useCheckScroll } from "@/shared/hooks/use-check-scroll";
// import { useToast } from "@/shared/hooks/use-toast";
// import { cn } from "@/shared/utils/cn";

// import { prepareDefaultProfileFormValues } from "../utils/prepare-default-profile-form-values";
// import {
//   profileFormMatchValidateFn,
//   profileFormValidateFn,
// } from "../utils/profile-form-helpers";

// type ProfileFormProps = {
//   profile?: ProfileExtended;
//   profileTypes: ProfileType[];
//   tones: Tone[];
//   platforms: Platform[];
//   overlayRef: RefObject<HTMLDivElement | null>;
//   onDialogClose: () => void;
// };

// export const ProfileDialogForm = ({
//   profile,
//   profileTypes,
//   tones,
//   platforms,
//   overlayRef,
//   onDialogClose,
// }: ProfileFormProps) => {
//   const queryClient = useQueryClient();
//   const { showSuccessToast, showErrorToast } = useToast();

//   const { isScrolledToBottom } = useCheckScroll({
//     elementRef: overlayRef,
//     scrollOffsetBottom: 40,
//   });

//   const { mutate: createProfile, isPending: isCreateProfilePending } =
//     useCreateProfileMutation({
//       onSuccess: ({ profile }) => {
//         queryClient.invalidateQueries({ queryKey: myProfilesQueryKey() });
//         onDialogClose();

//         showSuccessToast({
//           title: "Профиль создан",
//           description: `Профиль "${profile.name}" успешно создан`,
//         });
//       },
//       onError: () => {
//         showErrorToast({
//           description: `Произошла ошибка при создании профиля. Попробуйте еще раз немного позже`,
//         });
//       },
//     });

//   const { mutate: updateProfile, isPending: isUpdateProfilePending } =
//     useUpdateProfileMutation({
//       onSuccess: ({ profile }) => {
//         queryClient.invalidateQueries({ queryKey: myProfilesQueryKey() });

//         queryClient.invalidateQueries({
//           queryKey: profileQueryKey({ profileId: profile.id }),
//         });

//         onDialogClose();

//         showSuccessToast({
//           title: "Профиль обновлен",
//           description: `Профиль "${profile.name}" успешно обновлен`,
//         });
//       },
//       onError: () => {
//         showErrorToast({
//           description: `Произошла ошибка при обновлении профиля. Попробуйте еще раз немного позже`,
//         });
//       },
//     });

//   const form = useAppForm({
//     defaultValues: prepareDefaultProfileFormValues({ profile, profileTypes }),
//     validators: {
//       onSubmit: profile ? profileFormMatchValidateFn : profileFormValidateFn,
//     },
//     onSubmit: ({ value }) => {
//       if (profile) {
//         updateProfile({
//           params: {
//             profileId: profile.id,
//             ...value,
//           },
//         });
//       } else {
//         createProfile({ params: value });
//       }
//     },
//   });

//   const { onFormSubmit } = useFormHandlers({ form });
//   const isLoading = isCreateProfilePending || isUpdateProfilePending;

//   return (
//     <form onSubmit={onFormSubmit} className="flex w-full flex-col">
//       <DialogBody>
//         <form.AppField name="name">
//           {(field) => (
//             <field.InputField
//               size="lg"
//               label="Название профиля / канала"
//               autoComplete="off"
//               placeholder="Mr.Beast"
//             />
//           )}
//         </form.AppField>
//         <form.AppField name="description">
//           {(field) => (
//             <field.TextareaField
//               label="Описание профиля / канала"
//               placeholder="Вся релевантная информация о вашем профиле / канале"
//             />
//           )}
//         </form.AppField>
//         <form.AppField name="targetAudience">
//           {(field) => (
//             <field.InputField
//               size="lg"
//               label="Целевая аудитория"
//               autoComplete="off"
//               placeholder="Мужчины и женщины в возврасте от 25 до 40 лет, имеющие интерес к катанию на горных велосипедах"
//             />
//           )}
//         </form.AppField>
//         <form.AppField name="typeId">
//           {(field) => (
//             <field.RadioCardsGroupField
//               label="Тип профиля"
//               items={profileTypes.map((profileType) => ({
//                 label: profileType.name,
//                 value: profileType.id,
//               }))}
//             />
//           )}
//         </form.AppField>
//         <form.AppField name="toneIds">
//           {(field) => (
//             <field.CheckboxChipsField
//               title="Тональность"
//               items={tones.map((tone) => ({
//                 value: tone.id,
//                 children: tone.name,
//               }))}
//             />
//           )}
//         </form.AppField>
//         <form.AppField name="platformIds">
//           {(field) => (
//             <field.CheckboxChipsField
//               title="Платформы"
//               items={platforms.map((platform) => ({
//                 value: platform.id,
//                 children: platform.name,
//               }))}
//             />
//           )}
//         </form.AppField>
//       </DialogBody>
//       <DialogFooter
//         className={cn("sticky -bottom-10 z-1 duration-200", {
//           "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
//         })}
//       >
//         <DialogClose asChild>
//           <Button size="lg" type="button">
//             Отмена
//           </Button>
//         </DialogClose>
//         <form.AppForm>
//           <form.SubmitButton
//             size="lg"
//             state={isLoading ? "loading" : "default"}
//             className="ml-auto"
//           >
//             {profile ? "Сохранить" : "Создать профиль"}
//           </form.SubmitButton>
//         </form.AppForm>
//       </DialogFooter>
//     </form>
//   );
// };
