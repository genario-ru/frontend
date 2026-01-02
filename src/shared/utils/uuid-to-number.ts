export const uuidToNumber = (uuid: string, totalIndexes: number) => {
  // Generate a hash from the UUID
  let hash = 0;

  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }

  // Convert the hash to a number between 0 and (totalIndexes - 1)
  return Math.abs(hash % totalIndexes);
};
