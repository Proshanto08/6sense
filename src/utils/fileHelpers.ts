import fs from "fs";
import path from "path";

export const deleteFile = (filePath: string): void => {
  const fullPath = path.join(__dirname, "../uploads", path.basename(filePath));
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Error deleting file ${fullPath}:`, err);
    }
  });
};
