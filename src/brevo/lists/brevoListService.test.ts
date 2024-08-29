import { initializeBrevoClient } from "../../config/brevoConfig";
import {
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList,
  getContactsFromList,
  addContactsToList,
} from "./brevoListService";
import { IApiResponse } from "../../types";

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
) => {
  mockedBrevoClient[method].mockResolvedValue({ status, data });
};

const mockBrevoClientError = (
  method: "get" | "post" | "put" | "delete",
  errorMessage: string,
) => {
  mockedBrevoClient[method].mockRejectedValue(new Error(errorMessage));
};

const mockSuccessResponse = (message: string) => {
  return (response: any) => ({
    status: response.status,
    message,
  });
};

const mockErrorResponse = (status: number, errorMessage: string) => {
  return (err: Error) => ({
    status,
    message: errorMessage || err.message,
  });
};

describe("Brevo List Service", () => {
  describe("getAllLists", () => {
    it("should retrieve all lists successfully", async () => {
      mockBrevoClientResponse("get", 200, {});
      const result: IApiResponse = await getAllLists();

      expect(result.status).toBe(200);
      expect(result.message).toBe("Lists retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith("/contacts/lists", {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it("should handle errors when retrieving lists", async () => {
      mockBrevoClientError("get", "Error");
      const result: IApiResponse = await getAllLists();

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("createList", () => {
    it("should create a list successfully", async () => {
      mockBrevoClientResponse("post", 201, {});
      const result: IApiResponse = await createList("Test List", 1);

      expect(result.status).toBe(201);
      expect(result.message).toBe("List successfully created");
      expect(mockedBrevoClient.post).toHaveBeenCalledWith("/contacts/lists", {
        name: "Test List",
        folderId: 1,
      });
    });

    it("should handle errors when creating a list", async () => {
      mockBrevoClientError("post", "Error");
      const result: IApiResponse = await createList("Test List", 1);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("getList", () => {
    it("should retrieve a list successfully", async () => {
      mockBrevoClientResponse("get", 200, {});
      const result: IApiResponse = await getList(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe("List details retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith("/contacts/lists/1");
    });

    it("should handle errors when retrieving a list", async () => {
      mockBrevoClientError("get", "Error");
      const result: IApiResponse = await getList(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("updateList", () => {
    it("should update a list successfully", async () => {
      mockBrevoClientResponse("put", 200, {});
      const result: IApiResponse = await updateList(1, "Updated List", 2);

      expect(result.status).toBe(200);
      expect(result.message).toBe("List successfully updated");
      expect(mockedBrevoClient.put).toHaveBeenCalledWith("/contacts/lists/1", {
        name: "Updated List",
        folderId: 2,
      });
    });

    it("should handle errors when updating a list", async () => {
      mockBrevoClientError("put", "Error");
      const result: IApiResponse = await updateList(1, "Updated List", 2);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("deleteList", () => {
    it("should delete a list successfully", async () => {
      mockBrevoClientResponse("delete", 204, {});
      const result: IApiResponse = await deleteList(1);

      expect(result.status).toBe(204);
      expect(result.message).toBe("List successfully deleted");
      expect(mockedBrevoClient.delete).toHaveBeenCalledWith(
        "/contacts/lists/1",
      );
    });

    it("should handle errors when deleting a list", async () => {
      mockBrevoClientError("delete", "Error");
      const result: IApiResponse = await deleteList(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("getContactsFromList", () => {
    it("should retrieve contacts from a list successfully", async () => {
      mockBrevoClientResponse("get", 200, {});
      const result: IApiResponse = await getContactsFromList(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe("Contacts retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith(
        "/contacts/lists/1/contacts",
        {
          params: {
            modifiedSince: undefined,
            limit: undefined,
            offset: undefined,
            sort: undefined,
          },
        },
      );
    });

    it("should handle errors when retrieving contacts from a list", async () => {
      mockBrevoClientError("get", "Error");
      const result: IApiResponse = await getContactsFromList(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("addContactsToList", () => {
    it("should add contacts to a list successfully", async () => {
      mockBrevoClientResponse("post", 201, {});
      const result: IApiResponse = await addContactsToList(1, [
        "test@example.com",
      ]);

      expect(result.status).toBe(201);
      expect(result.message).toBe("Contacts added to the list successfully");
      expect(mockedBrevoClient.post).toHaveBeenCalledWith(
        "/contacts/lists/1/contacts/add",
        {
          emails: ["test@example.com"],
        },
      );
    });

    it("should handle errors when adding contacts to a list", async () => {
      mockBrevoClientError("post", "Error");
      const result: IApiResponse = await addContactsToList(1, [
        "test@example.com",
      ]);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });
});
