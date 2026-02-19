import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import {
  TemplateCardsRadioGroup,
  TemplateCardsRadioGroupItem,
} from "@/features/templates/template-card/components/template-cards-radio-group";
import { withForm } from "@/lib/tanstack-form";
import { FieldLayout } from "@/shared/components/layouts/field-layout";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

export const ScenarioSettingsTemplatesSelectionSubform = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  render: ({ form }) => {
    const { templatesData, isTemplatesLoading } = useGetTemplates();

    if (isTemplatesLoading) {
      return <div>Loading...</div>;
    }

    if (!templatesData?.data.length) {
      return <></>;
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
