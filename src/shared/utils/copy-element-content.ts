export const copyElementContent = (
  element: HTMLElement,
  callback?: (status: "error" | "success") => void,
) => {
  // Create a range and a selection
  const range = document.createRange();
  const selection = window.getSelection();

  // Select the text inside the element
  range.selectNodeContents(element);
  selection?.removeAllRanges();
  selection?.addRange(range);

  try {
    // Copy the text to the clipboard
    document.execCommand("copy");

    if (typeof callback === "function") callback("success");
  } catch (err) {
    console.error("Failed to copy text: ", err);

    if (typeof callback === "function") callback("error");
  }

  // Deselect the text
  selection?.removeAllRanges();
};
