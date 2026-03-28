import { useState } from "react";

export function useProfilesImportFormValidations() {
  const [successValidationFields, setSuccessValidationFields] = useState<
    number[]
  >([]);

  const [activeValidationFields, setActiveValidationFields] = useState<
    number[]
  >([]);

  function addSuccessValidationField(index: number) {
    setSuccessValidationFields((prev) => [...prev, index]);
  }

  function removeSuccessValidationField(index: number) {
    setSuccessValidationFields((prev) => prev.filter((i) => i !== index));
  }

  function addActiveValidationFieldIndex(index: number) {
    setActiveValidationFields((prev) => [...prev, index]);
  }

  function resetActiveValidationFieldIndex(index: number) {
    setActiveValidationFields((prev) => prev.filter((i) => i !== index));
  }

  return {
    successValidationFields,
    activeValidationFields,
    addSuccessValidationField,
    removeSuccessValidationField,
    addActiveValidationFieldIndex,
    resetActiveValidationFieldIndex,
  };
}
