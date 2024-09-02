import { initializeBrevoClient } from "../../config/brevoConfig";
import {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "./brevoContactService";
import { IApiResponse } from "../../types";

jest.mock("../../config/brevoConfig");

const mockedBrevoClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

beforeEach((): void => {
  (initializeBrevoClient as jest.Mock).mockReturnValue(mockedBrevoClient);
  jest.clearAllMocks();
});

const mockSuccessResponse = (
  method: keyof typeof mockedBrevoClient,
  status: number,
  data: any,
): void => {
  mockedBrevoClient[method].mockResolvedValue({ status, data });
};

const mockErrorResponse = (
  method: keyof typeof mockedBrevoClient,
  errorMessage: string,
): void => {
  mockedBrevoClient[method].mockRejectedValue({ message: errorMessage });
};

describe("Contact Service", () => {
  describe("getAllContacts", () => {
    it("should retrieve all contacts successfully", async (): Promise<void> => {
      mockSuccessResponse("get", 200, {});
      const result: IApiResponse = await getAllContacts();
      expect(result.status).toBe(200);
      expect(result.message).toBe("Contacts retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith("/contacts", {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it("should handle errors when retrieving contacts", async (): Promise<void> => {
      mockErrorResponse("get", "Error");
      const result: IApiResponse = await getAllContacts();
      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("createContact", () => {
    it("should create a contact successfully", async (): Promise<void> => {
      mockSuccessResponse("post", 201, {});
      const result: IApiResponse = await createContact(
        "test@example.com",
        { name: "Test" },
        [1],
        true,
      );
      expect(result.status).toBe(201);
      expect(result.message).toBe("Contact successfully created");
      expect(mockedBrevoClient.post).toHaveBeenCalledWith("/contacts", {
        email: "test@example.com",
        attributes: { name: "Test" },
        listIds: [1],
        updateEnabled: true,
      });
    });

    it("should handle errors when creating a contact", async (): Promise<void> => {
      mockErrorResponse("post", "Error");
      const result: IApiResponse = await createContact("test@example.com", {
        name: "Test",
      });
      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("getContactById", () => {
    it("should retrieve a contact by ID successfully", async (): Promise<void> => {
      mockSuccessResponse("get", 200, {});
      const result: IApiResponse = await getContactById("123");
      expect(result.status).toBe(200);
      expect(result.message).toBe("Contact details retrieved successfully");
      expect(mockedBrevoClient.get).toHaveBeenCalledWith("/contacts/123");
    });

    it("should handle errors when retrieving a contact by ID", async (): Promise<void> => {
      mockErrorResponse("get", "Error");
      const result: IApiResponse = await getContactById("123");
      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("updateContact", () => {
    it("should update a contact successfully", async (): Promise<void> => {
      mockSuccessResponse("put", 200, {});
      const result: IApiResponse = await updateContact(
        "123",
        "updated@example.com",
        { name: "Updated" },
        [2],
        false,
      );
      expect(result.status).toBe(200);
      expect(result.message).toBe("Contact successfully updated");
      expect(mockedBrevoClient.put).toHaveBeenCalledWith("/contacts/123", {
        email: "updated@example.com",
        attributes: { name: "Updated" },
        listIds: [2],
        updateEnabled: false,
      });
    });

    it("should handle errors when updating a contact", async (): Promise<void> => {
      mockErrorResponse("put", "Error");
      const result: IApiResponse = await updateContact(
        "123",
        "updated@example.com",
        { name: "Updated" },
      );
      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });

  describe("deleteContact", () => {
    it("should delete a contact successfully", async (): Promise<void> => {
      mockSuccessResponse("delete", 204, {});
      const result: IApiResponse = await deleteContact("123");
      expect(result.status).toBe(204);
      expect(result.message).toBe("Contact successfully deleted");
      expect(mockedBrevoClient.delete).toHaveBeenCalledWith("/contacts/123");
    });

    it("should handle errors when deleting a contact", async (): Promise<void> => {
      mockErrorResponse("delete", "Error");
      const result: IApiResponse = await deleteContact("123");
      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });
});
