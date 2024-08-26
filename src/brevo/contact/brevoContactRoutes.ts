import express from 'express';
import {
  createContactController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
  getAllContactsController
} from './brevoContactController';

const router = express.Router();


router.post('/contacts', createContactController);
router.get('/contacts', getAllContactsController);
router.get('/contacts/:identifier', getContactByIdController);
router.put('/contacts/:identifier', updateContactController);
router.delete('/contacts/:identifier', deleteContactController);

export default router;
