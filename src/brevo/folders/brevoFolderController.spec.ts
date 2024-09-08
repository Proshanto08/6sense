import request from "supertest";
import express from "express";
import {
  createFolderController,
  getFoldersController,
  getFolderController,
  updateFolderController,
  deleteFolderController,
  getFolderListsController,
} from "./brevoFolderController";
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
app.post("/folders", createFolderController);
app.get("/folders", getFoldersController);
app.get("/folders/:folderId", getFolderController);
app.put("/folders/:folderId", updateFolderController);
app.delete("/folders/:folderId", deleteFolderController);
app.get("/folders/:folderId/lists", getFolderListsController);

describe("Brevo Folder Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a folder", async () => {
    const mockResult = { status: 201, data: { id: 1, name: "New Folder" } };
    (createFolder as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app)
      .post("/folders")
      .send({ name: "New Folder" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResult);
    expect(createFolder).toHaveBeenCalledWith("New Folder");
  });

  it("should get all folders", async () => {
    const mockResult = { status: 200, data: [] };
    (getFolders as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get(
      "/folders?limit=10&offset=0&sort=asc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getFolders).toHaveBeenCalledWith(10, 0, "asc");
  });

  it("should get a folder by ID", async () => {
    const mockResult = { status: 200, data: { id: 1, name: "Folder 1" } };
    (getFolder as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get("/folders/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getFolder).toHaveBeenCalledWith(1);
  });

  it("should update a folder", async () => {
    const mockResult = { status: 200, data: { id: 1, name: "Updated Folder" } };
    (updateFolder as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app)
      .put("/folders/1")
      .send({ name: "Updated Folder" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(updateFolder).toHaveBeenCalledWith(1, "Updated Folder");
  });

  it("should delete a folder", async () => {
    const mockResult = { status: 204 }; // 204 No Content
    (deleteFolder as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).delete("/folders/1");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(deleteFolder).toHaveBeenCalledWith(1);
  });

  it("should get lists for a folder", async () => {
    const mockResult = { status: 200, data: [] };
    (getFolderLists as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get(
      "/folders/1/lists?limit=10&offset=0&sort=asc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getFolderLists).toHaveBeenCalledWith(1, 10, 0, "asc");
  });
});
