import { deleteFile } from "./fileUtils";

export const deleteFiles = (filePaths: (string | undefined)[]): void => {
  filePaths.filter(Boolean).forEach((filePath) => {
    if (filePath) {
      deleteFile(filePath);
    }
  });
};
