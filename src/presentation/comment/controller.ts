import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'

export class CommentController {
   // OBTENER TODOS LOS COMENTARIOS
   static getComments = async (req: Request, res: Response) => {
      try {
         const user = await prisma.comment.findMany()
         return res.status(200).json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   // OBTENER UN COMENTARIO POR ID
   static getCommentById = async (req: Request, res: Response) => {
      const { id } = req.params
      try {
         const user = await prisma.comment.findUnique({
            where: { id },
         })
         if (!user) {
            return res.status(404).json({ error: 'The user does not exist' })
         }
         return res.status(200).json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   // CREAR UN NUEVO COMENTARIO
   static createComment = async (req: Request, res: Response) => {
      const { content, authorId } = req.body
      try {
         const userExist = await prisma.user.findUnique({
            where: { id: authorId },
         })
         if (!userExist) {
            return res.status(404).json({ error: 'The user does not exist' })
         }
         const user = await prisma.comment.create({
            data: {
               content: content,
               authorId: authorId,
            },
         })
         return res.status(201).json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   // ACTUALIZAR UN COMENTARIO POR ID
   static updateComment = async (req: Request, res: Response) => {
      const { id } = req.params
      const { content } = req.body
      try {
         const comment = await prisma.comment.update({
            where: { id },
            data: { content },
         })
         if (!comment) {
            return res.status(404).json({ error: 'Comment not found' })
         }
         return res.status(200).json(comment)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   //ELIMINAR COMENTARIO POR ID
   static deleteComment = async (req: Request, res: Response) => {
      const { id } = req.params
      try {
         const comment = await prisma.comment.delete({
            where: { id },
         })
         if (!comment) {
            return res.status(404).json({ error: 'Comment not found' })
         }
         return res.status(200).json(comment)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }
}
