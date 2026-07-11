export function getProfileSettingsReferenceAttachmentDeleteTexts(
  itemName: string,
) {
  return {
    title: "Удалить файл?",
    description: `Файл «${itemName}» будет удалён из референсов профиля. Восстановить его будет нельзя`,
  };
}

export function getProfileSettingsReferenceChannelVideoDeleteTexts(
  itemName: string,
) {
  return {
    title: "Удалить видео?",
    description: `Видео «${itemName}» будет удалено из референсов профиля. Восстановить его будет нельзя`,
  };
}
