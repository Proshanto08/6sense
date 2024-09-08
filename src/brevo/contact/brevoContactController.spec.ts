import request from "supertest";
import express from "express";
import {
  getAllContactsController,
  createContactController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
} from "./brevoContactController";
import {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "./brevoContactService";

jest.mock("./brevoContactService");

const app = express();
app.use(express.json());
app.get("/contacts", getAllContactsController);
app.post("/contacts", createContactController);
app.get("/contacts/:identifier", getContactByIdController);
app.put("/contacts/:identifier", updateContactController);
app.delete("/contacts/:identifier", deleteContactController);

describe("Brevo Contact Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all contacts", async () => {
    const mockResult = { status: 200, data: [] };
    (getAllContacts as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get(
      "/contacts?limit=10&offset=0&sort=asc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getAllContacts).toHaveBeenCalledWith(10, 0, "asc");
  });

  it("should create a contact", async () => {
    const mockResult = { status: 201, data: { id: "123" } };
    (createContact as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).post("/contacts").send({
      email: "test@example.com",
      attributes: {},
      listIds: [],
      updateEnabled: true,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResult);
    expect(createContact).toHaveBeenCalledWith(
      "test@example.com",
      {},
      [],
      true
    );
  });

  it("should get a contact by ID", async () => {
    const mockResult = {
      status: 200,
      data: { id: "123", email: "test@example.com" },
    };
    (getContactById as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).get("/contacts/123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(getContactById).toHaveBeenCalledWith("123");
  });

  it("should update a contact", async () => {
    const mockResult = {
      status: 200,
      data: { id: "123", email: "updated@example.com" },
    };
    (updateContact as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).put("/contacts/123").send({
      email: "updated@example.com",
      attributes: {},
      listIds: [],
      updateEnabled: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(updateContact).toHaveBeenCalledWith(
      "123",
      "updated@example.com",
      {},
      [],
      true
    );
  });

  it("should delete a contact", async () => {
    const mockResult = { status: 204 };
    (deleteContact as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).delete("/contacts/123");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(deleteContact).toHaveBeenCalledWith("123");
  });
});
