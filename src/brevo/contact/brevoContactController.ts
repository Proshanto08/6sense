import { Request, Response } from 'express';
import { getAllContacts, createContact, getContactById, updateContact, deleteContact } from './brevoContactService';

export const getAllContactsController = async (req: Request, res: Response): Promise<void> => {
  const { limit, offset, sort } = req.query;
  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;
  const parsedSort = sort ? String(sort) : 'desc';
  const result = await getAllContacts(parsedLimit, parsedOffset, parsedSort);
  res.status(result.status).json(result);
};

export const createContactController = async (req: Request, res: Response): Promise<void> => {
  const { email, attributes, listIds, updateEnabled } = req.body;
  const result = await createContact(email, attributes, listIds, updateEnabled);
  res.status(result.status).json(result);
};

export const getContactByIdController = async (req: Request, res: Response): Promise<void> => {
  const { identifier } = req.params;
  const result = await getContactById(identifier);
  res.status(result.status).json(result);
};

export const updateContactController = async (req: Request, res: Response): Promise<void> => {
  const { identifier } = req.params;
  const { email, attributes, listIds, updateEnabled } = req.body;
  const result = await updateContact(identifier, email, attributes, listIds, updateEnabled);
  res.status(result.status).json(result);
};

export const deleteContactController = async (req: Request, res: Response): Promise<void> => {
  const { identifier } = req.params;
  const result = await deleteContact(identifier);
  res.status(result.status).json(result);
};
