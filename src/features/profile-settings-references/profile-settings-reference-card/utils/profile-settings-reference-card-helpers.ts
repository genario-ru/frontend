export function checkIsProfileSettingsReferenceCardImageMimeType(
  mimeType?: string,
) {
  return mimeType?.startsWith("image/");
}

export function checkIsProfileSettingsReferenceCardVideoMimeType(
  mimeType?: string,
) {
  return mimeType?.startsWith("video/");
}
