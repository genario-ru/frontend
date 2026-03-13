import * as z from "zod";

z.config({
  customError: (iss) => {
    switch (iss.code) {
      case "invalid_element":
        return {
          message: "Некорректный элемент",
        };

      case "invalid_type":
        return {
          message: "Некорректный тип данных",
        };

      case "invalid_format":
        return {
          message: "Некорректный формат данных",
        };

      case "invalid_key":
        return {
          message: "Некорректный ключ объекта",
        };

      case "invalid_union":
        return {
          message:
            "Введенное значение не соответствует ни одному из допустимых вариантов",
        };
      case "invalid_value":
        return {
          message: "Некорректное значение",
        };

      case "not_multiple_of":
        return {
          message: "Значение не кратно требуемому числу",
        };

      case "too_big":
        if (iss.origin === "array") {
          return {
            message: `Выберите не более ${iss.maximum} элементов`,
          };
        }

        return {
          message: `Введенное значение должно быть не более ${iss.maximum} символов`,
        };

      case "too_small":
        if (iss.origin === "array") {
          return {
            message: `Выберите не менее ${iss.minimum} элементов`,
          };
        }

        return {
          message: `Введенное значение должно быть не менее ${iss.minimum} символов`,
        };

      case "unrecognized_keys":
        return {
          message: "Обнаружены нераспознанные ключи",
        };

      default:
        return null;
    }
  },
});

export { z };
