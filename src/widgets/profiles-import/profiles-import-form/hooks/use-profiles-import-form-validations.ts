import { useState } from "react";

export function useProfilesImportFormValidations() {
  const [successValidationFields, setSuccessValidationFields] = useState<
    number[]
  >([]);

  const [activeValidationFieldIndex, setActiveValidationFieldIndex] = useState<
    number | null
  >(null);

  function addSuccessValidationField(index: number) {
    setSuccessValidationFields((prev) => [...prev, index]);
  }

  function removeSuccessValidationField(index: number) {
    setSuccessValidationFields((prev) => prev.filter((i) => i !== index));
  }

  function resetActiveValidationFieldIndex() {
    setActiveValidationFieldIndex(null);
  }

  return {
    successValidationFields,
    activeValidationFieldIndex,
    addSuccessValidationField,
    removeSuccessValidationField,
    setActiveValidationFieldIndex,
    resetActiveValidationFieldIndex,
  };
}
