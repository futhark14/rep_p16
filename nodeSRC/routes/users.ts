import express from 'express';
import userController from '../controllers/users';
import intrestController from '../controllers/interests';
const router = express.Router();

router.post('/users/signup',userController.signUp);
router.get('/users/login', userController.login);
router.get('/interests/',intrestController.getInterests);

export = router;