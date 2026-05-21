import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import {
  TemplateCardsRadioGroup,
  TemplateCardsRadioGroupItem,
  TemplateCardsRadioGroupSkeleton,
} from "@/features/templates/template-card/components/template-cards-radio-group";
import { noTemplateOption } from "@/features/templates/template-card/constants/no-template-option";
import { withForm } from "@/lib/tanstack-form";
import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Plug } from "@/shared/components/ui/plug";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

export const IdeasListSettingsTemplatesSelectionSubform = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  render: ({ form }) => {
    const { templatesData, isTemplatesLoading, isTemplatesError } =
      useGetTemplates();

    if (isTemplatesLoading) {
      return <IdeasListSettingsTemplatesSelectionSubformSkeleton />;
    }

    if (isTemplatesError) {
      return <IdeasListSettingsTemplatesSelectionSubformErrorPlug />;
    }

    if (!templatesData?.data.length) {
      return <IdeasListSettingsTemplatesSelectionSubformEmptyPlug />;
    }

    return (
      <form.Field
        name={`${IdeasListSettingsFormSteps.TemplateSelection}.templateId`}
      >
        {(field) => (
          <FieldLayout message={field.state.meta.errors[0]}>
            <TemplateCardsRadioGroup
              value={field.state.value ?? noTemplateOption.value}
              onBlur={field.handleBlur}
              onValueChange={(value) =>
                field.handleChange(
                  value === noTemplateOption.value ? null : value,
                )
              }
            >
              <TemplateCardsRadioGroupItem
                value={noTemplateOption.value}
                name={noTemplateOption.name}
                icon={noTemplateOption.icon}
                color={noTemplateOption.color}
                description={noTemplateOption.description}
                checked={field.state.value == null}
              />
              {templatesData.data.map((item) => (
                <TemplateCardsRadioGroupItem
                  key={item.id}
                  value={item.id}
                  name={item.name}
                  icon={item.icon}
                  color={item.color}
                  description={item.description}
                  checked={field.state.value === item.id}
                />
              ))}
            </TemplateCardsRadioGroup>
          </FieldLayout>
        )}
      </form.Field>
    );
  },
});

export function IdeasListSettingsTemplatesSelectionSubformSkeleton() {
  return <TemplateCardsRadioGroupSkeleton />;
}

export function IdeasListSettingsTemplatesSelectionSubformEmptyPlug() {
  return (
    <Plug
      className="flex-1"
      title="Нет шаблонов"
      description="На данный момент нет доступных шаблонов для выбора"
    />
  );
}

export function IdeasListSettingsTemplatesSelectionSubformErrorPlug() {
  return (
    <Plug
      variant="negative"
      className="flex-1"
      title="Ошибка загрузки"
      description="Произошла ошибка при загрузке шаблонов. Попробуйте обновить страницу"
    />
  );
}
