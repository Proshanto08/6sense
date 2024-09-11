import {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
  getFolderLists,
} from "./brevoFolder.service";
import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";

jest.mock("../../utils/apiRequest");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

describe("FolderService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a folder", async () => {
    const mockResponse: IApiResponse = {
      status: 201,
      message: "Folder successfully created",
      data: { id: 1, name: "New Folder" },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await createFolder("New Folder");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "post",
      "/contacts/folders",
      "Folder successfully created",
      { name: "New Folder" },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should retrieve all folders", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Folders retrieved successfully",
      data: [],
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getFolders(10, 0, "asc");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/folders",
      "Folders retrieved successfully",
      undefined,
      { limit: 10, offset: 0, sort: "asc" },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should retrieve a folder by ID", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Folder details retrieved successfully",
      data: { id: 1, name: "Folder 1" },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getFolder(1);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/folders/1",
      "Folder details retrieved successfully",
    );
    expect(result).toEqual(mockResponse);
  });

  it("should update a folder", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Folder successfully updated",
      data: { id: 1, name: "Updated Folder" },
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await updateFolder(1, "Updated Folder");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "put",
      "/contacts/folders/1",
      "Folder successfully updated",
      { name: "Updated Folder" },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should delete a folder", async () => {
    const mockResponse: IApiResponse = {
      status: 204,
      message: "Folder successfully deleted",
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await deleteFolder(1);
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "delete",
      "/contacts/folders/1",
      "Folder successfully deleted",
    );
    expect(result).toEqual(mockResponse);
  });

  it("should retrieve folder lists", async () => {
    const mockResponse: IApiResponse = {
      status: 200,
      message: "Folder lists fetched successfully",
      data: [],
    };
    mockedApiRequest.mockResolvedValue(mockResponse);

    const result = await getFolderLists(1, 10, 0, "asc");
    expect(mockedApiRequest).toHaveBeenCalledWith(
      "get",
      "/contacts/folders/1/lists",
      "Folder lists fetched successfully",
      undefined,
      { limit: 10, offset: 0, sort: "asc" },
    );
    expect(result).toEqual(mockResponse);
  });
});
