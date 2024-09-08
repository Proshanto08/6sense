import request from "supertest";
import express from "express";
import router from "./brevoContactRoutes";
import {
  createContact,
  getContactById,
  updateContact,
  deleteContact,
  getAllContacts,
} from "./brevoContactService";

jest.mock("./brevoContactService");

const app = express();
app.use(express.json());
app.use(router);

describe("Contacts Routes", () => {
  describe("POST /contacts", () => {
    it("should create a contact", async () => {
      const mockContact = {
        email: "test@example.com",
        attributes: {},
        listIds: [],
        updateEnabled: true,
      };
      const mockResult = { status: 201, data: { id: "123", ...mockContact } };

      (createContact as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).post("/contacts").send(mockContact);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResult);
      expect(createContact).toHaveBeenCalledWith(
        mockContact.email,
        mockContact.attributes,
        mockContact.listIds,
        mockContact.updateEnabled,
      );
    });
  });

  describe("GET /contacts", () => {
    it("should get all contacts", async () => {
      const mockResult = {
        status: 200,
        data: [{ id: "123", email: "test@example.com" }],
      };

      (getAllContacts as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).get("/contacts");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(getAllContacts).toHaveBeenCalledWith(undefined, undefined, "desc");
    });
  });

  describe("GET /contacts/:identifier", () => {
    it("should get a contact by id", async () => {
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
  });

  describe("PUT /contacts/:identifier", () => {
    it("should update a contact", async () => {
      const mockUpdate = {
        email: "updated@example.com",
        attributes: {},
        listIds: [],
        updateEnabled: false,
      };
      const mockResult = { status: 200, data: { id: "123", ...mockUpdate } };

      (updateContact as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).put("/contacts/123").send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(updateContact).toHaveBeenCalledWith(
        "123",
        mockUpdate.email,
        mockUpdate.attributes,
        mockUpdate.listIds,
        mockUpdate.updateEnabled,
      );
    });
  });

  describe("DELETE /contacts/:identifier", () => {
    it("should delete a contact", async () => {
      const mockResult = { status: 204, data: null };

      (deleteContact as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app).delete("/contacts/123");

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
      expect(deleteContact).toHaveBeenCalledWith("123");
    });
  });
});
