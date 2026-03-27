import { useState } from "react";

export function useProfilesImportFormValidations() {
  const [successValidationFields, setSuccessValidationFields] = useState<
    number[]
  >([]);

  function addSuccessValidationField(index: number) {
    setSuccessValidationFields((prev) => [...prev, index]);
  }

  function removeSuccessValidationField(index: number) {
    setSuccessValidationFields((prev) => prev.filter((i) => i !== index));
  }

  return {
    successValidationFields,
    addSuccessValidationField,
    removeSuccessValidationField,
  };
}
