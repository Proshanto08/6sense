import upload from '../config/multerConfig';

export const handleProjectUploads = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'imageSrc', maxCount: 1 },
  { name: 'overviewImage', maxCount: 1 },
  { name: 'solutionImage', maxCount: 1 },
  { name: 'keyFeaturesImage', maxCount: 1 },
  { name: 'resultImage', maxCount: 1 },
  { name: 'clientImage', maxCount: 1 },
  { name: 'teamIcon', maxCount: 1 },
  { name: 'sprintIcon', maxCount: 1 },
  { name: 'timeIcon', maxCount: 1 },
  { name: 'technologiesIcon', maxCount: 1 },
  { name: 'industryIcon', maxCount: 1 }
]);
