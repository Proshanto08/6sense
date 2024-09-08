import request from "supertest";
import express from "express";
import router from "./brevoListRoutes";
import {
  createList,
  getAllLists,
  getList,
  updateList,
  deleteList,
  getContactsFromList,
  addContactsToList,
} from "./brevoListService";

jest.mock("./brevoListService");

const app = express();
app.use(express.json());
app.use(router);

describe("Lists Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /lists", () => {
    it("should create a list", async () => {
      const mockList = { name: "New List", folderId: "123" };
      const mockResult = { status: 201, data: { id: "456", ...mockList } };

      (createList as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).post("/lists").send(mockList);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResult);
      expect(createList).toHaveBeenCalledWith(mockList.name, mockList.folderId);
    });
  });

  describe("GET /lists", () => {
    it("should get all lists", async () => {
      const mockResult = {
        status: 200,
        data: [{ id: "456", name: "List 1", folderId: "123" }],
      };

      (getAllLists as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).get("/lists");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getAllLists).toHaveBeenCalledWith(undefined, undefined, "desc");
    });
  });

  describe("GET /lists/:listId", () => {
    it("should get a list by ID", async () => {
      const mockResult = {
        status: 200,
        data: { id: "456", name: "List 1", folderId: "123" },
      };

      (getList as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).get("/lists/456");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getList).toHaveBeenCalledWith(456);
    });
  });

  describe("PUT /lists/:listId", () => {
    it("should update a list", async () => {
      const mockUpdate = { name: "Updated List", folderId: "123" };
      const mockResult = { status: 200, data: { id: "456", ...mockUpdate } };

      (updateList as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).put("/lists/456").send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(updateList).toHaveBeenCalledWith(
        456,
        mockUpdate.name,
        mockUpdate.folderId
      );
    });
  });

  describe("DELETE /lists/:listId", () => {
    it("should delete a list", async () => {
      const mockResult = { status: 204 };

      (deleteList as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).delete("/lists/456");

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
      expect(deleteList).toHaveBeenCalledWith(456);
    });
  });

  describe("GET /contacts/lists/:listId/contacts", () => {
    it("should get contacts from a list", async () => {
      const mockResult = {
        status: 200,
        data: [{ id: "789", email: "contact@example.com" }],
      };
      const queryParams = {
        modifiedSince: "2024-01-01T00:00:00Z",
        limit: "10",
        offset: "0",
        sort: "asc",
      };

      (getContactsFromList as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app)
        .get("/contacts/lists/456/contacts")
        .query(queryParams);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getContactsFromList).toHaveBeenCalledWith(
        456,
        "2024-01-01T00:00:00Z",
        10,
        0,
        "asc"
      );
    });
  });

  describe("POST /contacts/lists/:listId/contacts/add", () => {
    it("should add contacts to a list", async () => {
      const mockEmails = ["contact1@example.com", "contact2@example.com"];
      const mockResult = { status: 200, data: { success: true } };

      (addContactsToList as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app)
        .post("/contacts/lists/456/contacts/add")
        .send({ emails: mockEmails });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(addContactsToList).toHaveBeenCalledWith(456, mockEmails);
    });
  });
});
