import { Router } from "../deps.js";
import * as controller from "./controllers/controller.js"
import * as loginController from "./controllers/loginController.js"
import * as registerController from "./controllers/registerController.js"

const router = new Router();

router.get('/', controller.showLand);
router.post('/', controller.showIndex);
router.get('/index', controller.showIndex);

router.get('/login', loginController.showLogin);
router.post('/login', loginController.authenticate);

router.get('/register', registerController.showRegister);
router.post('/register', registerController.register);

export { router };
