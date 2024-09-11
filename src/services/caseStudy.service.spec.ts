import Project, { IProject } from "../models/casestudyModel";
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProjectBySlug,
} from "./caseStudy.service";
import { IApiResponse } from "../types";

jest.mock("../models/casestudyModel");
const mockProject = {
  title: "Test Project",
  appName: "Test App",
  logo: "test-logo.png",
  slug: "test-project",
  imageSrc: "test-image.png",
  details: {
    coloredPartTitle: "Test Title",
    regularTitle: "Regular Title",
    heroInfo: [
      {
        icon: "icon.png",
        alt: "icon",
        title: "Hero Title",
        subtitle: "Hero Subtitle",
      },
    ],
    overviewParagraphs: ["Overview Paragraph"],
    overviewImage: "overview.png",
    aboutParagraph: "About Paragraph",
    aboutInfo: [
      {
        icon: "icon.png",
        alt: "icon",
        subtitle: "Subtitle",
        title: "About Title",
      },
    ],
    solution: {
      description: "Solution Description",
      solutionsPoints1: ["Point 1"],
      solutionsPoints2: ["Point 2"],
      solutionImage: "solution.png",
    },
    keyFeature: {
      description: "Key Feature Description",
      keyFeaturesPoints1: ["Feature 1"],
      keyFeaturesPoints2: ["Feature 2"],
      keyFeaturesImage: "feature.png",
    },
    result: {
      description: "Result Description",
      resultsPoints1: ["Result 1"],
      resultsPoints2: ["Result 2"],
    },
    clientFeedback: {
      clientNameAndDesignation: "Client Name",
      clientImage: "client.png",
      feedback: "Great feedback",
    },
  },
};

describe("Project Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createProject", () => {
    it("should create a project successfully", async () => {
      (Project.create as jest.Mock).mockResolvedValue(mockProject);

      const response: IApiResponse = await createProject(
        mockProject as IProject,
      );
      expect(response.status).toBe(201);
      expect(response.data).toEqual(mockProject);
      expect(response.message).toBe("Project successfully created");
    });

    it("should handle errors when creating a project", async () => {
      (Project.create as jest.Mock).mockRejectedValue(
        new Error("Error creating project"),
      );

      const response: IApiResponse = await createProject(
        mockProject as IProject,
      );
      expect(response.status).toBe(500);
      expect(response.message).toBe("Failed to create project");
    });
  });

  describe("getAllProjects", () => {
    it("should retrieve all projects successfully", async () => {
      (Project.find as jest.Mock).mockResolvedValue([mockProject]);

      const response: IApiResponse = await getAllProjects();
      expect(response.status).toBe(200);
      expect(response.data).toEqual([mockProject]);
      expect(response.message).toBe("Projects retrieved successfully");
    });

    it("should handle errors when retrieving all projects", async () => {
      (Project.find as jest.Mock).mockRejectedValue(
        new Error("Error retrieving projects"),
      );

      const response: IApiResponse = await getAllProjects();
      expect(response.status).toBe(500);
      expect(response.message).toBe("Failed to retrieve projects");
    });
  });

  //  // Mock setup in your test file
  // describe('getBasicProjects', () => {
  //   it('should retrieve basic projects with pagination', async () => {
  //     // Mock the methods used in getBasicProjects
  //     (Project.find as jest.Mock).mockResolvedValue([mockProject]);
  //     (Project.countDocuments as jest.Mock).mockResolvedValue(1);

  //     const response: IApiResponse = await getBasicProjects(1, 6);
  //     expect(response.status).toBe(200);
  //     expect(response.data.projects).toEqual([mockProject]);
  //     expect(response.data.totalPages).toBe(1);
  //     expect(response.data.currentPage).toBe(1);
  //     expect(response.message).toBe('Basic projects retrieved successfully');
  //   });

  //   it('should handle errors when retrieving basic projects', async () => {
  //     // Mock the methods used in getBasicProjects
  //     (Project.find as jest.Mock).mockRejectedValue(new Error('Error retrieving projects'));
  //     (Project.countDocuments as jest.Mock).mockResolvedValue(0); // Ensure countDocuments also returns something

  //     const response: IApiResponse = await getBasicProjects();
  //     expect(response.status).toBe(500);
  //     expect(response.message).toBe('Failed to retrieve basic projects');
  //   });
  // });

  describe("getProjectBySlug", () => {
    it("should retrieve a project by slug", async () => {
      (Project.findOne as jest.Mock).mockResolvedValue(mockProject);

      const response: IApiResponse = await getProjectBySlug("test-project");
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockProject);
      expect(response.message).toBe("Project details retrieved successfully");
    });

    it("should handle project not found", async () => {
      (Project.findOne as jest.Mock).mockResolvedValue(null);

      const response: IApiResponse = await getProjectBySlug("test-project");
      expect(response.status).toBe(404);
      expect(response.message).toBe("Project not found");
    });

    it("should handle errors when retrieving a project by slug", async () => {
      (Project.findOne as jest.Mock).mockRejectedValue(
        new Error("Error retrieving project"),
      );

      const response: IApiResponse = await getProjectBySlug("test-project");
      expect(response.status).toBe(500);
      expect(response.message).toBe("Failed to retrieve project details");
    });
  });

  describe("updateProject", () => {
    it("should update a project by slug", async () => {
      (Project.findOneAndUpdate as jest.Mock).mockResolvedValue(mockProject);

      const response: IApiResponse = await updateProject("test-project", {
        title: "Updated Title",
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockProject);
      expect(response.message).toBe("Project successfully updated");
    });

    it("should handle project not found during update", async () => {
      (Project.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      const response: IApiResponse = await updateProject("test-project", {
        title: "Updated Title",
      });
      expect(response.status).toBe(404);
      expect(response.message).toBe("Project not found");
    });

    it("should handle errors when updating a project", async () => {
      (Project.findOneAndUpdate as jest.Mock).mockRejectedValue(
        new Error("Error updating project"),
      );

      const response: IApiResponse = await updateProject("test-project", {
        title: "Updated Title",
      });
      expect(response.status).toBe(500);
      expect(response.message).toBe("Failed to update project");
    });
  });

  describe("deleteProjectBySlug", () => {
    it("should delete a project by slug", async () => {
      (Project.findOneAndDelete as jest.Mock).mockResolvedValue(mockProject);

      const response: IApiResponse = await deleteProjectBySlug("test-project");
      expect(response.status).toBe(200);
      expect(response.data).toEqual({});
      expect(response.message).toBe("Project successfully deleted");
    });

    it("should handle project not found during delete", async () => {
      (Project.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      const response: IApiResponse = await deleteProjectBySlug("test-project");
      expect(response.status).toBe(404);
      expect(response.message).toBe("Project not found");
    });

    it("should handle errors when deleting a project", async () => {
      (Project.findOneAndDelete as jest.Mock).mockRejectedValue(
        new Error("Error deleting project"),
      );

      const response: IApiResponse = await deleteProjectBySlug("test-project");
      expect(response.status).toBe(500);
      expect(response.message).toBe("Failed to delete project");
    });
  });
});
