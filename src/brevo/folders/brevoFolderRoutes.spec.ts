import request from "supertest";
import express from "express";
import router from "./brevoFolderRoutes";
import {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
  getFolderLists,
} from "./brevoFolderService";

jest.mock("./brevoFolderService");

const app = express();
app.use(express.json());
app.use(router);

describe("Folders Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /folders", () => {
    it("should create a folder", async () => {
      const mockFolder = { name: "New Folder" };
      const mockResult = { status: 201, data: { id: "123", ...mockFolder } };

      (createFolder as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).post("/folders").send(mockFolder);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResult);
      expect(createFolder).toHaveBeenCalledWith(mockFolder.name);
    });
  });

  describe("GET /folders", () => {
    it("should get all folders", async () => {
      const mockResult = {
        status: 200,
        data: [{ id: "123", name: "Folder 1" }],
      };

      (getFolders as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).get("/folders");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getFolders).toHaveBeenCalledWith(undefined, undefined, "desc");
    });
  });

  describe("GET /folders/:folderId", () => {
    it("should get a folder by ID", async () => {
      const mockResult = { status: 200, data: { id: "123", name: "Folder 1" } };

      (getFolder as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).get("/folders/123");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getFolder).toHaveBeenCalledWith(123);
    });
  });

  describe("PUT /folders/:folderId", () => {
    it("should update a folder", async () => {
      const mockUpdate = { name: "Updated Folder" };
      const mockResult = { status: 200, data: { id: "123", ...mockUpdate } };

      (updateFolder as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).put("/folders/123").send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(updateFolder).toHaveBeenCalledWith(123, mockUpdate.name);
    });
  });

  describe("DELETE /folders/:folderId", () => {
    it("should delete a folder", async () => {
      const mockResult = { status: 204 };

      (deleteFolder as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).delete("/folders/123");

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
      expect(deleteFolder).toHaveBeenCalledWith(123);
    });
  });

  describe("GET /folders/:folderId/lists", () => {
    it("should get lists from a folder", async () => {
      const mockResult = { status: 200, data: [{ id: "456", name: "List 1" }] };
      const queryParams = { limit: "10", offset: "0", sort: "asc" };

      (getFolderLists as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app)
        .get("/folders/123/lists")
        .query(queryParams);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getFolderLists).toHaveBeenCalledWith(123, 10, 0, "asc");
    });
  });
});
