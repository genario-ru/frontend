export function copyElementContent(
  element: HTMLElement,
  callback?: (status: "error" | "success") => void,
) {
  const plainText = element.innerText;
  const html = element.innerHTML;

  try {
    const item = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" }),
    });

    navigator.clipboard
      .write([item])
      .then(() => {
        callback?.("success");
      })
      .catch(() => {
        callback?.("error");
      });
  } catch {
    callback?.("error");
  }
}
