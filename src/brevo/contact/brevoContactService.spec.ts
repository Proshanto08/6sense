import {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "./brevoContactService";
import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";

jest.mock("../../utils/apiRequest");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

describe("BrevoContactService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all contacts", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Contacts retrieved successfully",
      data: [],
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getAllContacts(10, 0, "asc");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts",
      "Contacts retrieved successfully",
      undefined,
      { limit: 10, offset: 0, sort: "asc" },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should create a contact", async () => {
    const mockResponse: IApiResponse = {
      status: 201,
      message: "Contact successfully created",
      data: { id: "123", email: "test@example.com" },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await createContact("test@example.com", {}, [1], true);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "post",
      "/contacts",
      "Contact successfully created",
      {
        email: "test@example.com",
        attributes: {},
        listIds: [1],
        updateEnabled: true,
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should retrieve a contact by ID", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Contact details retrieved successfully",
      data: { id: "123", email: "test@example.com" },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getContactById("123");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/123",
      "Contact details retrieved successfully",
    );
    expect(result).toEqual(mockResponse);
  });

  it("should update a contact", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Contact successfully updated",
      data: { id: "123", email: "updated@example.com" },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await updateContact(
      "123",
      "updated@example.com",
      {},
      [1],
      true,
    );
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "put",
      "/contacts/123",
      "Contact successfully updated",
      {
        email: "updated@example.com",
        attributes: {},
        listIds: [1],
        updateEnabled: true,
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should delete a contact", async () => {
    const mockResponse: IApiResponse = {
      status: 204,
      message: "Contact successfully deleted",
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await deleteContact("123");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "delete",
      "/contacts/123",
      "Contact successfully deleted"
    );
    expect(result).toEqual(mockResponse);
  });
});
