import { Router } from 'express'
import { UserRoutes } from './user/routes'
import { CommentRoutes } from './comment/routes'

export class AppRoutes {
   static get routes(): Router {
      const router = Router()

      //RUTAS DE USUARIO
      router.use('/users', UserRoutes.routes)

      //RUTAS DE COMENTARIOS
      router.use('/comments', CommentRoutes.routes)

      return router
   }
}
