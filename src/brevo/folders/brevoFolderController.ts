import { Request, Response } from 'express';
import { createFolder, getFolders, getFolder, updateFolder, deleteFolder, getFolderLists } from './brevoFolderService';

export const createFolderController = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const result = await createFolder(name);
    res.status(result.status).json(result);
};


export const getFoldersController = async (req: Request, res: Response): Promise<void> => {
    const { limit, offset, sort } = req.query;

    const parsedLimit = limit ? Number(limit) : undefined;
    const parsedOffset = offset ? Number(offset) : undefined;
    const parsedSort = sort ? String(sort) : 'desc';
    const result = await getFolders(parsedLimit, parsedOffset, parsedSort);
    res.status(result.status).json(result);
};


export const getFolderController = async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params;
    const result = await getFolder(Number(folderId));
    res.status(result.status).json(result);
};


export const updateFolderController = async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params;
    const { name } = req.body;
    const result = await updateFolder(Number(folderId), name);
    res.status(result.status).json(result);
};


export const deleteFolderController = async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params;
    const result = await deleteFolder(Number(folderId));
    res.status(result.status).json(result);
};


export const getFolderListsController = async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params;
    const { limit, offset, sort } = req.query;
    const parsedLimit = limit ? Number(limit) : undefined;
    const parsedOffset = offset ? Number(offset) : undefined;
    const parsedSort = sort ? String(sort) : 'desc';

    const result = await getFolderLists(Number(folderId), parsedLimit, parsedOffset, parsedSort);
    res.status(result.status).json(result);
};




