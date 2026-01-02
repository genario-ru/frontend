import * as z from "zod";

// Минимум 8 символов, как минимум одна заглавная буква, одна прописная буква,
// одно число и один специальный символ
export const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/,
);

const passwordValidationErrorMessage = "Введите корректный пароль";

const newPasswordValidationErrorMessage =
  "Ваш пароль должен содержать:\n- Минимум 8 символов\n- Максимум 64 символа\n- Минимум одну заглавную букву\n- Минимум одну прописную букву\n- Минимум одно число\n- Минимум один специальный символ";

export const newPasswordSchema = z
  .string()
  .regex(passwordValidation, { message: newPasswordValidationErrorMessage });

export const passwordSchema = z
  .string()
  .regex(passwordValidation, { message: passwordValidationErrorMessage });
