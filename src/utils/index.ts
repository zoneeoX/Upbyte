
// @ NOTE THIS IS FOR CONVERTING BYTES TO MB (KARENA DEFAULT ITU BYTES)
export const formatToByte = (bytes: number): string => {
  const MB = bytes / (1024 * 1024);
  return MB.toFixed(2) + " MB";
};
