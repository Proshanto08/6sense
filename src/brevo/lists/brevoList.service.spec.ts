import {
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList,
  getContactsFromList,
  addContactsToList,
} from "./brevoList.service";
import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";

jest.mock("../../utils/apiRequest");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

describe("ListService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all lists", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Lists retrieved successfully",
      data: [],
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getAllLists(10, 0, "asc");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/lists",
      "Lists retrieved successfully",
      undefined,
      { limit: 10, offset: 0, sort: "asc" },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should create a list", async () => {
    const mockResponse: IApiResponse = {
      status: 201,
      message: "List successfully created",
      data: { id: 1, name: "New List", folderId: 1 },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await createList("New List", 1);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "post",
      "/contacts/lists",
      "List successfully created",
      { name: "New List", folderId: 1 },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should retrieve a list by ID", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "List details retrieved successfully",
      data: { id: 1, name: "List 1", folderId: 1 },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getList(1);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/lists/1",
      "List details retrieved successfully",
    );
    expect(result).toEqual(mockResponse);
  });

  it("should update a list", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "List successfully updated",
      data: { id: 1, name: "Updated List", folderId: 1 },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await updateList(1, "Updated List", 1);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "put",
      "/contacts/lists/1",
      "List successfully updated",
      { name: "Updated List", folderId: 1 },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should delete a list", async () => {
    const mockResponse: IApiResponse = {
      status: 204,
      message: "List successfully deleted",
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await deleteList(1);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "delete",
      "/contacts/lists/1",
      "List successfully deleted",
    );
    expect(result).toEqual(mockResponse);
  });

  it("should retrieve contacts from a list", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Contacts retrieved successfully",
      data: [],
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getContactsFromList(1, "2024-01-01", 10, 0, "asc");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/lists/1/contacts",
      "Contacts retrieved successfully",
      undefined,
      { modifiedSince: "2024-01-01", limit: 10, offset: 0, sort: "asc" },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should add contacts to a list", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Contacts added to the list successfully",
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await addContactsToList(1, ["test@example.com"]);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "post",
      "/contacts/lists/1/contacts/add",
      "Contacts added to the list successfully",
      { emails: ["test@example.com"] },
    );
    expect(result).toEqual(mockResponse);
  });
});
