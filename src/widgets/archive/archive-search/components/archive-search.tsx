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
    <form onSubmit={onFormSubmit} className="flex flex-1 gap-2">
      <form.AppField name="q">
        {(field) => (
          <field.InputField placeholder="Заголовок или описание..." />
        )}
      </form.AppField>
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
