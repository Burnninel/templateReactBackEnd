import { Router } from "express"
import { login } from "./controllers/login"
import { createAccount } from "./controllers/createAccount"

const router = Router()

router.post("/login", new login().handle)

router.post("/createAccount", new createAccount().handle)

export { router }