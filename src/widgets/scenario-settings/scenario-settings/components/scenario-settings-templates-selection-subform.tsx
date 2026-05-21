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
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

export const ScenarioSettingsTemplatesSelectionSubform = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  render: ({ form }) => {
    const { templatesData, isTemplatesLoading, isTemplatesError } =
      useGetTemplates();

    if (isTemplatesLoading) {
      return <ScenarioSettingsTemplatesSelectionSubformSkeleton />;
    }

    if (isTemplatesError) {
      return <ScenarioSettingsTemplatesSelectionSubformErrorPlug />;
    }

    if (!templatesData?.data.length) {
      return <ScenarioSettingsTemplatesSelectionSubformEmptyPlug />;
    }

    return (
      <form.Field
        name={`${ScenarioSettingsFormSteps.TemplateSelection}.templateId`}
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

export function ScenarioSettingsTemplatesSelectionSubformSkeleton() {
  return <TemplateCardsRadioGroupSkeleton />;
}

export function ScenarioSettingsTemplatesSelectionSubformEmptyPlug() {
  return (
    <Plug
      title="Нет шаблонов"
      description="На данный момент нет доступных шаблонов для выбора"
      className="flex-1"
    />
  );
}

export function ScenarioSettingsTemplatesSelectionSubformErrorPlug() {
  return (
    <Plug
      variant="negative"
      title="Ошибка загрузки"
      description="Произошла ошибка при загрузке шаблонов. Попробуйте обновить страницу"
      className="flex-1"
    />
  );
}
