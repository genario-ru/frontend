import { toast } from "../utils/toast";

type ShowToastParams = {
  title?: string;
  description?: string;
};

export const useToast = () => {
  const showErrorToast = ({
    title = "Ошибка",
    description = "Не удалось выполнить данную операцию",
  }: ShowToastParams) => {
    toast({
      variant: "error",
      title,
      description,
    });
  };

  const showSuccessToast = ({
    title = "Успех",
    description = "Данная операция была успешно выполнена",
  }: ShowToastParams) => {
    toast({
      variant: "success",
      title,
      description,
    });
  };

  const showInfoToast = ({
    title = "Информация",
    description = "Здесь должно быть какое-то информативное сообщение",
  }: ShowToastParams) => {
    toast({
      variant: "info",
      title,
      description,
    });
  };

  return { showErrorToast, showSuccessToast, showInfoToast };
};
