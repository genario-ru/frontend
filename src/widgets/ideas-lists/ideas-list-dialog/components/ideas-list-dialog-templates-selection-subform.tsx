import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import {
  TemplateCardsRadioGroup,
  TemplateCardsRadioGroupItem,
} from "@/features/templates/components/template-cards-radio-group";
import { withForm } from "@/lib/tanstack-form";
import { FieldLayout } from "@/shared/components/layouts/field-layout";

import {
  type IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
} from "../utils/ideas-list-dialog-form-helpers";

export const IdeasListDialogTemplatesSelectionSubform = withForm({
  defaultValues: {} as IdeasListDialogFormSchema,
  render: ({ form }) => {
    const { templatesData, isTemplatesLoading } = useGetTemplates();

    if (isTemplatesLoading) {
      return <div>Loading...</div>;
    }

    if (!templatesData) {
      return <></>;
    }

    return (
      <div className="flex flex-col gap-6">
        <form.Field
          name={`${IdeasListDialogFormSteps.TemplateSelection}.templateId`}
        >
          {(field) => (
            <FieldLayout errorMessage={field.state.meta.errors[0]}>
              <TemplateCardsRadioGroup
                defaultValue=""
                value={field.state.value ?? undefined}
                onBlur={field.handleBlur}
                onValueChange={(e) => field.handleChange(e)}
              >
                <TemplateCardsRadioGroupItem
                  value=""
                  name="Без шаблона"
                  icon="circle"
                  description="Идеи видео любых типов на ваш вкус"
                />
                {templatesData.data.map((item) => (
                  <TemplateCardsRadioGroupItem
                    key={item.id}
                    value={item.id}
                    name={item.name}
                    icon={item.icon}
                    color={item.color}
                    description={item.description}
                  />
                ))}
              </TemplateCardsRadioGroup>
            </FieldLayout>
          )}
        </form.Field>
      </div>
    );
  },
});
