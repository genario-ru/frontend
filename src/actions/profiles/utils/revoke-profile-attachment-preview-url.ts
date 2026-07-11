export function revokeProfileAttachmentPreviewUrl(
  previewObjectUrl: string | undefined,
) {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
  }
}
