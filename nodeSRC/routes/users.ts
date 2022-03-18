import express from 'express';
import userController from '../controllers/users';
import intrestController from '../controllers/interests';
const router = express.Router();

router.post('/users/signup',userController.signUp);

router.post('/users/editInterests',userController.editUserInterests);

router.get('/users/login', userController.login);

router.get('/session/',userController.isActive);
router.post('/session/startround',userController.startSession);
router.post('/session/stopround',userController.stopSession);
router.post('/session/endEvent',userController.endEvent);
router.post('/session/autoMatch',userController.endEvent);
router.post('/session/getMatch',userController.getMatch);
router.post('/session/manualMatch',userController.manualMatch);
router.get('/session/getShares',userController.getShares);
router.post('/session/setShares',userController.setShares);
router.post('/session/getMatches',userController.getMatches);

router.get('/interests/',intrestController.getInterests);
export = router;