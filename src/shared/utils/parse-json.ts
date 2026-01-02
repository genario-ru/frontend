export function parseJson<T>(jsonString?: string | null): T | undefined {
  if (jsonString) {
    let parsedData: T | undefined;

    try {
      parsedData = JSON.parse(jsonString) as T;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }

    return parsedData;
  }
}
