export function checkTouchScreen() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
