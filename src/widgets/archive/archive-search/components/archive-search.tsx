import { SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useArchiveSearch } from "../hooks/use-archive-search";

export function ArchiveSearch() {
  const {
    form,
    hasCommittedQuery,
    isDraftDirty,
    onFormSubmit,
    resetArchiveSearch,
  } = useArchiveSearch();

  return (
    <form onSubmit={onFormSubmit} className="flex min-w-0 flex-1 gap-2">
      <div className="min-w-0 flex-1">
        <form.AppField name="q">
          {(field) => (
            <field.InputField placeholder="Заголовок или описание..." />
          )}
        </form.AppField>
      </div>
      {isDraftDirty && (
        <form.AppForm>
          <form.SubmitButton priority="secondary" icon={<SearchIcon />} />
        </form.AppForm>
      )}
      {hasCommittedQuery && (
        <Button type="button" icon={<XIcon />} onClick={resetArchiveSearch} />
      )}
    </form>
  );
}
