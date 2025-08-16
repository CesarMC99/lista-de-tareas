import { Router } from 'express'
import { CommentController } from './controller'

export class CommentRoutes {
   static get routes(): Router {
      const router = Router()

      // OBTENER TODOS LOS COMENTARIOS
      router.get('/', CommentController.getComments)

      // OBTENER UN COMENTARIO POR ID
      router.get('/:id', CommentController.getCommentById)

      // CREAR UN NUEVO COMENTARIO
      router.post('/', CommentController.createComment)

      // ACTUALIZAR UN COMENTARIO POR ID
      router.patch('/:id', CommentController.updateComment)

      // ELIMINAR UN COMENTARIO POR ID
      router.delete('/:id', CommentController.deleteComment)

      return router
   }
}
