import { Router, Request } from "express"
import { login } from "./controllers/login"
import { createAccount } from "./controllers/createAccount"
import { account } from "./controllers/account"
import { updateAccount } from "./controllers/updateAccount"
import { uploadPhoto } from "./controllers/uploadPhoto"

import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
     cb(null, file.originalname)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: (err: Error | null, accept: boolean) => void) => {
    const validImg = file.mimetype.match(/^image\//)
    if (!validImg) {
        return cb(new Error("Invalid image"), false)
    }
    cb(null, true)
 }
   
const upload = multer({ storage: storage, fileFilter: fileFilter })

const router = Router()

router.post("/login", new login().handle)

router.post("/createAccount", new createAccount().handle)

router.get("/account", new account().handle)

router.post("/updateAccount", new updateAccount().handle)

router.post("/uploadPhoto", upload.single('avatar'), new uploadPhoto().handle)

export { router }