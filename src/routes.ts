import { Router } from "express"
import { login } from "./controllers/login"
import { createAccount } from "./controllers/createAccount"
import { account } from "./controllers/account"
import { updateAccount } from "./controllers/updateAccount"
// import { esureAuthenticated } from "./services/login"

const router = Router()

router.post("/login", new login().handle)

router.post("/createAccount", new createAccount().handle)

router.get("/account", new account().handle)

router.post("/updateAccount", new updateAccount().handle)

export { router }