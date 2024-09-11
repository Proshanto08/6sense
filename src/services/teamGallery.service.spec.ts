import TeamGallery, { ITeamGallery } from "../models/teamGalleryModel";
import {
  createTeamGallery,
  getAllTeamGalleries,
  getTeamGalleryById,
  updateTeamGallery,
  deleteTeamGalleryById,
} from "./teamGallery.service";
import { handleSuccess, handleError } from "../utils/responseHandlers";

jest.mock("../models/teamGalleryModel");
jest.mock("../utils/responseHandlers");

describe("TeamGallery Service Functions", () => {
  const mockGalleryData = {
    title: "Test Gallery",
    image: "image.png",
    _id: "12345",
  } as ITeamGallery;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTeamGallery", () => {
    it("should create a team gallery successfully", async () => {
      (TeamGallery.create as jest.Mock).mockResolvedValue(mockGalleryData);

      const response = await createTeamGallery(mockGalleryData);

      expect(response).toEqual(
        handleSuccess(
          { status: 201, data: mockGalleryData },
          "Gallery successfully created",
        ),
      );
      expect(TeamGallery.create).toHaveBeenCalledWith(mockGalleryData);
    });

    it("should handle errors during gallery creation", async () => {
      (TeamGallery.create as jest.Mock).mockImplementation(() => {
        throw new Error("Creation error");
      });

      const response = await createTeamGallery(mockGalleryData);

      expect(response).toEqual(
        handleError(
          new Error("Creation error"),
          "CREATE_GALLERY_FAILED",
          "Failed to create gallery",
          500,
        ),
      );
    });
  });

  describe("getAllTeamGalleries", () => {
    it("should retrieve all team galleries successfully", async () => {
      (TeamGallery.find as jest.Mock).mockResolvedValue([mockGalleryData]);

      const response = await getAllTeamGalleries();

      expect(response).toEqual(
        handleSuccess(
          { status: 200, data: [mockGalleryData] },
          "Galleries retrieved successfully",
        ),
      );
    });

    it("should handle errors during retrieval of all galleries", async () => {
      (TeamGallery.find as jest.Mock).mockImplementation(() => {
        throw new Error("Retrieval error");
      });

      const response = await getAllTeamGalleries();

      expect(response).toEqual(
        handleError(
          new Error("Retrieval error"),
          "GET_GALLERIES_FAILED",
          "Failed to retrieve galleries",
          500,
        ),
      );
    });
  });

  describe("getTeamGalleryById", () => {
    it("should retrieve gallery by ID successfully", async () => {
      (TeamGallery.findById as jest.Mock).mockResolvedValue(mockGalleryData);

      const response = await getTeamGalleryById(mockGalleryData._id as string);

      expect(response).toEqual(
        handleSuccess(
          { status: 200, data: mockGalleryData },
          "Gallery details retrieved successfully",
        ),
      );
    });

    it("should handle gallery not found error", async () => {
      (TeamGallery.findById as jest.Mock).mockResolvedValue(null);

      const response = await getTeamGalleryById("non-existent-id");

      expect(response).toEqual(
        handleError(
          new Error("Gallery not found"),
          "GALLERY_NOT_FOUND",
          "Gallery not found",
          404,
        ),
      );
    });

    it("should handle errors during retrieval of gallery by ID", async () => {
      (TeamGallery.findById as jest.Mock).mockImplementation(() => {
        throw new Error("Retrieval error");
      });

      const response = await getTeamGalleryById(mockGalleryData._id as string);

      expect(response).toEqual(
        handleError(
          new Error("Retrieval error"),
          "GET_GALLERY_BY_ID_FAILED",
          "Failed to retrieve gallery details",
          500,
        ),
      );
    });
  });

  describe("updateTeamGallery", () => {
    it("should update gallery successfully", async () => {
      (TeamGallery.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        mockGalleryData,
      );

      const response = await updateTeamGallery(mockGalleryData._id as string, {
        title: "Updated Title",
      });

      expect(response).toEqual(
        handleSuccess(
          { status: 200, data: mockGalleryData },
          "Gallery successfully updated",
        ),
      );
    });

    it("should handle gallery not found error during update", async () => {
      (TeamGallery.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const response = await updateTeamGallery(mockGalleryData._id as string, {
        title: "Updated Title",
      });

      expect(response).toEqual(
        handleError(
          new Error("Gallery not found"),
          "GALLERY_NOT_FOUND",
          "Gallery not found",
          404,
        ),
      );
    });

    it("should handle errors during gallery update", async () => {
      (TeamGallery.findByIdAndUpdate as jest.Mock).mockImplementation(() => {
        throw new Error("Update error");
      });

      const response = await updateTeamGallery(mockGalleryData._id as string, {
        title: "Updated Title",
      });

      expect(response).toEqual(
        handleError(
          new Error("Update error"),
          "UPDATE_GALLERY_FAILED",
          "Failed to update gallery",
          500,
        ),
      );
    });
  });

  describe("deleteTeamGalleryById", () => {
    it("should delete gallery by ID successfully", async () => {
      (TeamGallery.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockGalleryData,
      );

      const response = await deleteTeamGalleryById(
        mockGalleryData._id as string,
      );

      expect(response).toEqual(
        handleSuccess(
          { status: 200, data: {} },
          "Gallery successfully deleted",
        ),
      );      
    });

    it("should handle gallery not found error during deletion", async () => {
      (TeamGallery.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const response = await deleteTeamGalleryById("non-existent-id");

      expect(response).toEqual(
        handleError(
          new Error("Gallery not found"),
          "GALLERY_NOT_FOUND",
          "Gallery not found",
          404,
        ),
      );
    });

    it("should handle errors during gallery deletion", async () => {
      (TeamGallery.findByIdAndDelete as jest.Mock).mockImplementation(() => {
        throw new Error("Deletion error");
      });

      const response = await deleteTeamGalleryById(
        mockGalleryData._id as string,
      );

      expect(response).toEqual(
        handleError(
          new Error("Deletion error"),
          "DELETE_GALLERY_FAILED",
          "Failed to delete gallery",
          500,
        ),
      );
    });
  });
});
