import { createProject, getAllProjects, getBasicProjects, getProjectBySlug, updateProject, deleteProjectBySlug } from './caseStudyService';
import Project from '../models/casestudyModel'; // Mock this in your tests
import { handleSuccess, handleError } from '../utils/responseHandlers';
import { IProject } from '../models/casestudyModel';
import { IApiResponse } from '../types';

// Full mock data for a project
const mockProjectData: Partial<IProject> = {
  appName: 'Test App',
  slug: 'test-app',
  title: 'Test Project Title',
  logo: 'test-logo.png',
  imageSrc: 'test-image.png',
  details: {
    coloredPartTitle: 'Highlighted Title',
    regularTitle: 'Regular Title',
    heroInfo: [
      {
        icon: 'icon-url',
        alt: 'Hero Image',
        title: 'Hero Title',
        subtitle: 'Hero Subtitle',
      },
    ],
    overviewParagraphs: ['Paragraph 1', 'Paragraph 2'],
    overviewImage: 'overview-image-url',
    aboutParagraph: 'About Paragraph',
    aboutInfo: [
      {
        icon: 'about-icon-url',
        alt: 'About Icon',
        subtitle: 'About Subtitle',
        title: 'About Title',
      },
    ],
    solution: {
      description: 'Solution Description',
      solutionsPoints1: ['Point 1', 'Point 2'],
      solutionsPoints2: ['Point 3', 'Point 4'],
      solutionImage: 'solution-image-url',
    },
    keyFeature: {
      description: 'Key Feature Description',
      keyFeaturesPoints1: ['Key Point 1', 'Key Point 2'],
      keyFeaturesPoints2: ['Key Point 3', 'Key Point 4'],
      keyFeaturesImage: 'key-feature-image-url',
    },
    result: {
      description: 'Result Description',
      resultsPoints1: ['Result Point 1', 'Result Point 2'],
      resultsPoints2: ['Result Point 3', 'Result Point 4'],
    },
    clientFeedback: {
      clientNameAndDesignation: 'Client Name - Designation',
      clientImage: 'client-image-url',
      feedback: 'This is feedback from the client',
    },
  },
};

jest.mock('../models/casestudyModel');
jest.mock('../utils/responseHandlers');

describe('Project Service', () => {
  describe('createProject', () => {
    it('should successfully create a project and return a success response', async () => {
      const mockCreatedProject = { ...mockProjectData, _id: 'mock-id' };
      (Project.create as jest.Mock).mockResolvedValue(mockCreatedProject);
      (handleSuccess as jest.Mock).mockReturnValue({
        statusCode: 201,
        message: 'Project successfully created',
        data: mockCreatedProject,
      });

      const response = await createProject(mockProjectData as IProject);

      expect(Project.create).toHaveBeenCalledWith(mockProjectData);
      expect(handleSuccess).toHaveBeenCalledWith(
        { status: 201, data: mockCreatedProject },
        'Project successfully created',
      );
      expect(response).toEqual({
        statusCode: 201,
        message: 'Project successfully created',
        data: mockCreatedProject,
      });
    });

    it('should handle an error when creating a project fails', async () => {
      const mockError = new Error('Create failed');
      (Project.create as jest.Mock).mockRejectedValue(mockError);
      (handleError as jest.Mock).mockReturnValue({
        statusCode: 500,
        errorCode: 'CREATE_PROJECT_FAILED',
        message: 'Failed to create project',
      });

      const response = await createProject(mockProjectData as IProject);

      expect(Project.create).toHaveBeenCalledWith(mockProjectData);
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        'CREATE_PROJECT_FAILED',
        'Failed to create project',
        500,
      );
      expect(response).toEqual({
        statusCode: 500,
        errorCode: 'CREATE_PROJECT_FAILED',
        message: 'Failed to create project',
      });
    });
  });

  describe('getAllProjects', () => {
    it('should successfully retrieve all projects and return a success response', async () => {
      const mockProjects = [mockProjectData, { ...mockProjectData, _id: 'mock-id-2' }];
      (Project.find as jest.Mock).mockResolvedValue(mockProjects);
      (handleSuccess as jest.Mock).mockReturnValue({
        statusCode: 200,
        message: 'Projects retrieved successfully',
        data: mockProjects,
      });

      const response = await getAllProjects();

      expect(Project.find).toHaveBeenCalled();
      expect(handleSuccess).toHaveBeenCalledWith(
        { status: 200, data: mockProjects },
        'Projects retrieved successfully',
      );
      expect(response).toEqual({
        statusCode: 200,
        message: 'Projects retrieved successfully',
        data: mockProjects,
      });
    });

    it('should handle an error when retrieving all projects fails', async () => {
      const mockError = new Error('Retrieve failed');
      (Project.find as jest.Mock).mockRejectedValue(mockError);
      (handleError as jest.Mock).mockReturnValue({
        statusCode: 500,
        errorCode: 'GET_PROJECTS_FAILED',
        message: 'Failed to retrieve projects',
      });

      const response = await getAllProjects();

      expect(Project.find).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        'GET_PROJECTS_FAILED',
        'Failed to retrieve projects',
        500,
      );
      expect(response).toEqual({
        statusCode: 500,
        errorCode: 'GET_PROJECTS_FAILED',
        message: 'Failed to retrieve projects',
      });
    });
  });

//   describe('getBasicProjects', () => {
//     it('should successfully retrieve basic projects and return a success response', async () => {
//       const mockBasicProjects = [mockProjectData, { ...mockProjectData, _id: 'mock-id-2' }];
//       (Project.find as jest.Mock).mockResolvedValue(mockBasicProjects);
//       (Project.countDocuments as jest.Mock).mockResolvedValue(2);
//       (handleSuccess as jest.Mock).mockReturnValue({
//         statusCode: 200,
//         message: 'Basic projects retrieved successfully',
//         data: {
//           projects: mockBasicProjects,
//           totalPages: 1,
//           currentPage: 1,
//         },
//       });

//       const response = await getBasicProjects();

//       expect(Project.find).toHaveBeenCalled();
//       expect(Project.countDocuments).toHaveBeenCalled();
//       expect(handleSuccess).toHaveBeenCalledWith(
//         {
//           status: 200,
//           data: {
//             projects: mockBasicProjects,
//             totalPages: 1,
//             currentPage: 1,
//           },
//         },
//         'Basic projects retrieved successfully',
//       );
//       expect(response).toEqual({
//         statusCode: 200,
//         message: 'Basic projects retrieved successfully',
//         data: {
//           projects: mockBasicProjects,
//           totalPages: 1,
//           currentPage: 1,
//         },
//       });
//     });

//     it('should handle an error when retrieving basic projects fails', async () => {
//       const mockError = new Error('Retrieve failed');
//       (Project.find as jest.Mock).mockRejectedValue(mockError);
//       (handleError as jest.Mock).mockReturnValue({
//         statusCode: 500,
//         errorCode: 'GET_BASIC_PROJECTS_FAILED',
//         message: 'Failed to retrieve basic projects',
//       });

//       const response = await getBasicProjects();

//       expect(Project.find).toHaveBeenCalled();
//       expect(handleError).toHaveBeenCalledWith(
//         mockError,
//         'GET_BASIC_PROJECTS_FAILED',
//         'Failed to retrieve basic projects',
//         500,
//       );
//       expect(response).toEqual({
//         statusCode: 500,
//         errorCode: 'GET_BASIC_PROJECTS_FAILED',
//         message: 'Failed to retrieve basic projects',
//       });
//     });
//   });

  describe('getProjectBySlug', () => {
    it('should successfully retrieve a project by slug and return a success response', async () => {
      const mockProject = { ...mockProjectData, _id: 'mock-id' };
      (Project.findOne as jest.Mock).mockResolvedValue(mockProject);
      (handleSuccess as jest.Mock).mockReturnValue({
        statusCode: 200,
        message: 'Project details retrieved successfully',
        data: mockProject,
      });

      const response = await getProjectBySlug(mockProjectData.slug as string);

      expect(Project.findOne).toHaveBeenCalledWith({ slug: mockProjectData.slug });
      expect(handleSuccess).toHaveBeenCalledWith(
        { status: 200, data: mockProject },
        'Project details retrieved successfully',
      );
      expect(response).toEqual({
        statusCode: 200,
        message: 'Project details retrieved successfully',
        data: mockProject,
      });
    });

    it('should handle an error when retrieving a project by slug fails', async () => {
      const mockError = new Error('Retrieve failed');
      (Project.findOne as jest.Mock).mockRejectedValue(mockError);
      (handleError as jest.Mock).mockReturnValue({
        statusCode: 500,
        errorCode: 'GET_PROJECT_BY_SLUG_FAILED',
        message: 'Failed to retrieve project details',
      });

      const response = await getProjectBySlug(mockProjectData.slug as string);

      expect(Project.findOne).toHaveBeenCalledWith({ slug: mockProjectData.slug });
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        'GET_PROJECT_BY_SLUG_FAILED',
        'Failed to retrieve project details',
        500,
      );
      expect(response).toEqual({
        statusCode: 500,
        errorCode: 'GET_PROJECT_BY_SLUG_FAILED',
        message: 'Failed to retrieve project details',
      });
    });
  });

  describe('updateProject', () => {
    it('should successfully update a project and return a success response', async () => {
      const updateData = { title: 'Updated Project Title' };
      const mockUpdatedProject = { ...mockProjectData, ...updateData, _id: 'mock-id' };
      (Project.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedProject);
      (handleSuccess as jest.Mock).mockReturnValue({
        statusCode: 200,
        message: 'Project successfully updated',
        data: mockUpdatedProject,
      });

      const response = await updateProject(mockProjectData.slug as string, updateData);

      expect(Project.findOneAndUpdate).toHaveBeenCalledWith(
        { slug: mockProjectData.slug },
        { $set: updateData },
        { new: true }
      );
      expect(handleSuccess).toHaveBeenCalledWith(
        { status: 200, data: mockUpdatedProject },
        'Project successfully updated',
      );
      expect(response).toEqual({
        statusCode: 200,
        message: 'Project successfully updated',
        data: mockUpdatedProject,
      });
    });

    it('should handle an error when updating a project fails', async () => {
      const mockError = new Error('Update failed');
      (Project.findOneAndUpdate as jest.Mock).mockRejectedValue(mockError);
      (handleError as jest.Mock).mockReturnValue({
        statusCode: 500,
        errorCode: 'UPDATE_PROJECT_FAILED',
        message: 'Failed to update project',
      });

      const response = await updateProject(mockProjectData.slug as string, {});

      expect(Project.findOneAndUpdate).toHaveBeenCalledWith(
        { slug: mockProjectData.slug },
        { $set: {} },
        { new: true }
      );
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        'UPDATE_PROJECT_FAILED',
        'Failed to update project',
        500,
      );
      expect(response).toEqual({
        statusCode: 500,
        errorCode: 'UPDATE_PROJECT_FAILED',
        message: 'Failed to update project',
      });
    });
  });

  describe('deleteProjectBySlug', () => {
    it('should successfully delete a project by slug and return a success response', async () => {
      const mockDeletedProject = { ...mockProjectData, _id: 'mock-id' };
      (Project.findOneAndDelete as jest.Mock).mockResolvedValue(mockDeletedProject);
      (handleSuccess as jest.Mock).mockReturnValue({
        statusCode: 200,
        message: 'Project successfully deleted',
        data: {},
      });

      const response = await deleteProjectBySlug(mockProjectData.slug as string);

      expect(Project.findOneAndDelete).toHaveBeenCalledWith({ slug: mockProjectData.slug });
      expect(handleSuccess).toHaveBeenCalledWith(
        { status: 200, data: {} },
        'Project successfully deleted',
      );
      expect(response).toEqual({
        statusCode: 200,
        message: 'Project successfully deleted',
        data: {},
      });
    });

    it('should handle an error when deleting a project fails', async () => {
      const mockError = new Error('Delete failed');
      (Project.findOneAndDelete as jest.Mock).mockRejectedValue(mockError);
      (handleError as jest.Mock).mockReturnValue({
        statusCode: 500,
        errorCode: 'DELETE_PROJECT_FAILED',
        message: 'Failed to delete project',
      });

      const response = await deleteProjectBySlug(mockProjectData.slug as string);

      expect(Project.findOneAndDelete).toHaveBeenCalledWith({ slug: mockProjectData.slug });
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        'DELETE_PROJECT_FAILED',
        'Failed to delete project',
        500,
      );
      expect(response).toEqual({
        statusCode: 500,
        errorCode: 'DELETE_PROJECT_FAILED',
        message: 'Failed to delete project',
      });
    });
  });
});
