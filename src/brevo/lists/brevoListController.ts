import { Request, Response } from 'express';
import { getAllLists, createList, getList, updateList, deleteList, getContactsFromList, addContactsToList } from './brevoListService';

export const getAllListsController = async (req: Request, res: Response): Promise<void> => {
  const { limit, offset, sort } = req.query;

  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;
  const parsedSort = sort ? String(sort) : 'desc';

  const result = await getAllLists(parsedLimit, parsedOffset, parsedSort);
  res.status(result.status).json(result);
};

export const createListController = async (req: Request, res: Response): Promise<void> => {
  const { name, folderId } = req.body;
  const result = await createList(name, folderId);
  res.status(result.status).json(result);
};

export const getListController = async (req: Request, res: Response): Promise<void> => {
  const { listId } = req.params;
  const result = await getList(Number(listId));
  res.status(result.status).json(result);
};

export const updateListController = async (req: Request, res: Response): Promise<void> => {
  const { listId } = req.params;
  const { name, folderId } = req.body;
  const result = await updateList(Number(listId), name, folderId);
  res.status(result.status).json(result);
};

export const deleteListController = async (req: Request, res: Response): Promise<void> => {
  const { listId } = req.params;
  const result = await deleteList(Number(listId));
  res.status(result.status).json(result);
};


export const getContactsFromListController = async (req: Request, res: Response): Promise<void> => {
  const { listId } = req.params;
  const { modifiedSince, limit, offset, sort } = req.query;

  const parsedLimit = limit ? Number(limit) : 50;
  const parsedOffset = offset ? Number(offset) : 0;
  const parsedSort = sort ? String(sort) : 'desc';
  const parsedModifiedSince = modifiedSince ? String(modifiedSince) : undefined;

  const result = await getContactsFromList(
    Number(listId),
    parsedModifiedSince,
    parsedLimit,
    parsedOffset,
    parsedSort
  );

  res.status(result.status).json(result);
};



export const addContactsToListController = async (req: Request, res: Response): Promise<void> => {
  const { listId } = req.params;
  const { emails } = req.body;

  const result = await addContactsToList(Number(listId), emails);
  res.status(result.status).json(result);
};



