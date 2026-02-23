import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import {
  TemplateCardsRadioGroup,
  TemplateCardsRadioGroupItem,
  TemplateCardsRadioGroupSkeleton,
} from "@/features/templates/template-card/components/template-cards-radio-group";
import { withForm } from "@/lib/tanstack-form";
import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { EmptyPlug } from "@/shared/components/ui/empty-plug";
import { ErrorPlug } from "@/shared/components/ui/error-plug";

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
          <FieldLayout errorMessage={field.state.meta.errors[0]}>
            <TemplateCardsRadioGroup
              value={field.state.value}
              onBlur={field.handleBlur}
              onValueChange={(e) => field.handleChange(e)}
            >
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
    <EmptyPlug
      className="flex-1"
      title="Нет шаблонов"
      description="На данный момент нет доступных шаблонов для выбора"
    />
  );
}

export function ScenarioSettingsTemplatesSelectionSubformErrorPlug() {
  return (
    <ErrorPlug
      className="flex-1"
      title="Ошибка загрузки"
      description="Произошла ошибка при загрузке шаблонов. Попробуйте обновить страницу"
    />
  );
}
