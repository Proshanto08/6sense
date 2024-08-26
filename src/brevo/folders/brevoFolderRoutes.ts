import express from 'express';
import { 
  createFolderController, 
  getFoldersController, 
  getFolderController, 
  updateFolderController, 
  deleteFolderController,
  getFolderListsController,
} from './brevoFolderController';

const router = express.Router();

router.post('/folders', createFolderController);
router.get('/folders', getFoldersController);
router.get('/folders/:folderId', getFolderController);
router.put('/folders/:folderId', updateFolderController);
router.delete('/folders/:folderId', deleteFolderController);
router.get('/folders/:folderId/lists', getFolderListsController);

export default router;
