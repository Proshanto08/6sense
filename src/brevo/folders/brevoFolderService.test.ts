import {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
  getFolderLists,
} from "./brevoFolderService";
import { IApiResponse } from "../../types";
import { initializeBrevoClient } from "../../config/brevoConfig";

jest.mock("../../config/brevoConfig");

const mockedBrevoClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

beforeEach(() => {
  (initializeBrevoClient as jest.Mock).mockReturnValue(mockedBrevoClient);
  jest.clearAllMocks();
});

const mockBrevoClientResponse = (
  method: "get" | "post" | "put" | "delete",
  status: number,
  data: any,
): void => {
  (mockedBrevoClient[method] as jest.Mock).mockResolvedValue({ status, data });
};

const mockBrevoClientError = (
  method: "get" | "post" | "put" | "delete",
  errorMessage: string,
): void => {
  (mockedBrevoClient[method] as jest.Mock).mockRejectedValue({
    message: errorMessage,
  });
};

const checkResponse = (
  result: IApiResponse,
  expectedStatus: number,
  expectedMessage: string,
): void => {
  expect(result.status).toBe(expectedStatus);
  expect(result.message).toBe(expectedMessage);
};

describe("Folder Service", () => {
  describe("createFolder", () => {
    it("should create a folder successfully", async (): Promise<void> => {
      const folderName = "Test Folder";
      mockBrevoClientResponse("post", 201, {});

      const result: IApiResponse = await createFolder(folderName);

      checkResponse(result, 201, "Folder successfully created");
      expect(mockedBrevoClient.post).toHaveBeenCalledWith("/contacts/folders", {
        name: folderName,
      });
    });

    it("should handle errors when creating a folder", async (): Promise<void> => {
      const folderName = "Test Folder";
      mockBrevoClientError("post", "Error");

      const result: IApiResponse = await createFolder(folderName);

      checkResponse(result, 500, "Error");
    });
  });

  describe("getFolders", () => {
    it("should retrieve all folders successfully", async (): Promise<void> => {
      mockBrevoClientResponse("get", 200, {});

      const result: IApiResponse = await getFolders();

      checkResponse(result, 200, "Folders retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith("/contacts/folders", {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it("should handle errors when retrieving folders", async (): Promise<void> => {
      mockBrevoClientError("get", "Error");

      const result: IApiResponse = await getFolders();

      checkResponse(result, 500, "Error");
    });
  });

  describe("getFolder", () => {
    it("should retrieve a folder successfully", async (): Promise<void> => {
      const folderId = 1;
      mockBrevoClientResponse("get", 200, {});

      const result: IApiResponse = await getFolder(folderId);

      checkResponse(result, 200, "Folder details retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith(
        `/contacts/folders/${folderId}`,
      );
    });

    it("should handle errors when retrieving a folder", async (): Promise<void> => {
      const folderId = 1;
      mockBrevoClientError("get", "Error");

      const result: IApiResponse = await getFolder(folderId);

      checkResponse(result, 500, "Error");
    });
  });

  describe("updateFolder", () => {
    it("should update a folder successfully", async (): Promise<void> => {
      const folderId = 1;
      const folderName = "Updated Folder";
      mockBrevoClientResponse("put", 200, {});

      const result: IApiResponse = await updateFolder(folderId, folderName);

      checkResponse(result, 200, "Folder successfully updated");
      expect(mockedBrevoClient.put).toHaveBeenCalledWith(
        `/contacts/folders/${folderId}`,
        { name: folderName },
      );
    });

    it("should handle errors when updating a folder", async (): Promise<void> => {
      const folderId = 1;
      const folderName = "Updated Folder";
      mockBrevoClientError("put", "Error");

      const result: IApiResponse = await updateFolder(folderId, folderName);

      checkResponse(result, 500, "Error");
    });
  });

  describe("deleteFolder", () => {
    it("should delete a folder successfully", async (): Promise<void> => {
      const folderId = 1;
      mockBrevoClientResponse("delete", 204, {});

      const result: IApiResponse = await deleteFolder(folderId);

      checkResponse(result, 204, "Folder successfully deleted");
      expect(mockedBrevoClient.delete).toHaveBeenCalledWith(
        `/contacts/folders/${folderId}`,
      );
    });

    it("should handle errors when deleting a folder", async (): Promise<void> => {
      const folderId = 1;
      mockBrevoClientError("delete", "Error");

      const result: IApiResponse = await deleteFolder(folderId);

      checkResponse(result, 500, "Error");
    });
  });

  describe("getFolderLists", () => {
    it("should retrieve lists from a folder successfully", async (): Promise<void> => {
      const folderId = 1;
      mockBrevoClientResponse("get", 200, {});

      const result: IApiResponse = await getFolderLists(folderId);

      checkResponse(result, 200, "Folder lists fetched successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith(
        `/contacts/folders/${folderId}/lists`,
        {
          params: { limit: undefined, offset: undefined, sort: undefined },
        },
      );
    });

    it("should handle errors when retrieving lists from a folder", async (): Promise<void> => {
      const folderId = 1;
      mockBrevoClientError("get", "Error");

      const result: IApiResponse = await getFolderLists(folderId);

      checkResponse(result, 500, "Error");
    });
  });
});
