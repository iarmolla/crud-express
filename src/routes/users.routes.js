import { Router } from 'express'
import { getUsers, getUser,insertUser, updateSalary, deleteUser,updateUser } from '../controllers/users.controller.js'

const router = Router()

router.get('/users',getUsers)

router.get('/users/:id',getUser)

router.post('/users',insertUser)

router.delete('/users/:id',deleteUser)

router.put('/users/:id',updateUser)

router.patch('/users/:id',updateSalary)



export default router