import express from 'express';
import { EmailsController, UsersController } from '../controllers';
import { authUser } from '../middlewares/Auth';

const router = express.Router();

router.get('/', (req, res) =>
  res.json('Olá, você está usando a api de envio de emails')
);
router.post('/user', UsersController.userValidation, UsersController.save);
router.post('/login', UsersController.loginValidation, UsersController.signin);

router.use(authUser);

router.post(
  '/user/sent-email',
  EmailsController.fieldsSendEmailValidation,
  EmailsController.sendOneEmail
);

router.get('/user/sent-emails', EmailsController.getEmails);

export default router;
