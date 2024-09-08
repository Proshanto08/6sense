import request from "supertest";
import express from "express";
import {
  getAllListsController,
  createListController,
  getListController,
  updateListController,
  deleteListController,
  getContactsFromListController,
  addContactsToListController,
} from "./brevoListController";
import {
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList,
  getContactsFromList,
  addContactsToList,
} from "./brevoListService";

jest.mock("./brevoListService");

const app = express();
app.use(express.json());
app.get("/lists", getAllListsController);
app.post("/lists", createListController);
app.get("/lists/:listId", getListController);
app.put("/lists/:listId", updateListController);
app.delete("/lists/:listId", deleteListController);
app.get("/lists/:listId/contacts", getContactsFromListController);
app.post("/lists/:listId/contacts", addContactsToListController);

describe("Brevo List Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all lists", async () => {
    const mockResult = { status: 200, data: [] };
    (getAllLists as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get(
      "/lists?limit=10&offset=0&sort=asc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getAllLists).toHaveBeenCalledWith(10, 0, "asc");
  });

  it("should create a list", async () => {
    const mockResult = {
      status: 201,
      data: { id: 1, name: "New List", folderId: 1 },
    };
    (createList as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app)
      .post("/lists")
      .send({ name: "New List", folderId: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResult);
    expect(createList).toHaveBeenCalledWith("New List", 1);
  });

  it("should get a list by ID", async () => {
    const mockResult = {
      status: 200,
      data: { id: 1, name: "List 1", folderId: 1 },
    };
    (getList as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get("/lists/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getList).toHaveBeenCalledWith(1);
  });

  it("should update a list", async () => {
    const mockResult = {
      status: 200,
      data: { id: 1, name: "Updated List", folderId: 2 },
    };
    (updateList as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app)
      .put("/lists/1")
      .send({ name: "Updated List", folderId: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(updateList).toHaveBeenCalledWith(1, "Updated List", 2);
  });

  it("should delete a list", async () => {
    const mockResult = { status: 204 };
    (deleteList as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).delete("/lists/1");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(deleteList).toHaveBeenCalledWith(1);
  });

  it("should get contacts from a list", async () => {
    const mockResult = { status: 200, data: [] };
    (getContactsFromList as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get(
      "/lists/1/contacts?limit=10&offset=0&sort=desc&modifiedSince=2023-01-01T00:00:00Z"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getContactsFromList).toHaveBeenCalledWith(
      1,
      "2023-01-01T00:00:00Z",
      10,
      0,
      "desc"
    );
  });

  it("should add contacts to a list", async () => {
    const mockResult = { status: 200, data: { success: true } };
    (addContactsToList as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app)
      .post("/lists/1/contacts")
      .send({ emails: ["test@example.com", "test2@example.com"] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(addContactsToList).toHaveBeenCalledWith(1, [
      "test@example.com",
      "test2@example.com",
    ]);
  });
});
