import { Router } from 'express'
import { getAll, addUser, updateUser, deleteUser } from "../services/user.service.js"

const router = Router()

router
  .get('/', getAll)
  .patch('/', updateUser)
  .delete('/', deleteUser)
  .post('/', addUser)

export default router