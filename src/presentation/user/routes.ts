import { Router } from 'express'
import { UserController } from './controller'

export class UserRoutes {
   static get routes(): Router {
      const router = Router()

      //OBTENER TODOS LOS USUARIOS
      router.get('/', UserController.getUsers)

      //OBTENER UN USUARIO POR ID
      router.get('/:id', UserController.getUserById)

      //CREAR UN NUEVO USUARIO
      router.post('/', UserController.createUser)

      //ACTUALIZAR UN USUARIO POR ID
      router.patch('/:id', UserController.updateUser)

      //ELIMINAR UN USUARIO POR ID
      router.delete('/:id', UserController.deleteUser)

      return router
   }
}
