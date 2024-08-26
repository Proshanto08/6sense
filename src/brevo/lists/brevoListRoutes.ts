import express from 'express';
import {
  createListController,
  getAllListsController,
  getListController,
  updateListController,
  deleteListController,
  getContactsFromListController,
  addContactsToListController,
} from './brevoListController';

const router = express.Router();

router.post('/lists', createListController);
router.get('/lists', getAllListsController);
router.get('/lists/:listId', getListController);
router.put('/lists/:listId', updateListController);
router.delete('/lists/:listId', deleteListController);
router.get('/contacts/lists/:listId/contacts', getContactsFromListController);
router.post('/contacts/lists/:listId/contacts/add', addContactsToListController);

export default router;
