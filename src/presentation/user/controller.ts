import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'

export class UserController {
   //OBTENER TODOS LOS USUARIOS
   static getUsers = async (req: Request, res: Response) => {
      try {
         const user = await prisma.user.findMany()
         return res.status(200).json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   //OBTENER UN USUARIO POR ID
   static getUserById = async (req: Request, res: Response) => {
      try {
         const { id } = req.params
         const user = await prisma.user.findUnique({
            where: { id },
         })

         if (!user) {
            return res.status(404).json({ error: 'User not found' })
         }

         return res.json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   //CREAR UN NUEVO USUARIO
   static createUser = async (req: Request, res: Response) => {
      const { name, email, password } = req.body

      try {
         const user = await prisma.user.create({
            data: {
               name: name,
               email: email,
               password: password,
            },
         })
         return res.status(201).json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   //ACTUALIZAR UN USUARIO POR ID
   static updateUser = async (req: Request, res: Response) => {
      const { id } = req.params
      const { name, email, password } = req.body
      try {
         const idExists = await prisma.user.findUnique({
            where: { id },
         })
         if (!idExists) {
            return res.status(404).json({ error: 'User not found' })
         }

         const user = await prisma.user.update({
            where: { id },
            data: {
               name,
               email,
               password,
            },
         })
         return res.json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }

   //ELIMINAR UN USUARIO POR ID
   static deleteUser = async (req: Request, res: Response) => {
      const { id } = req.params
      try {
         const user = await prisma.user.delete({
            where: { id },
         })
         if (!user) {
            return res.status(404).json({ error: 'User not found' })
         }
         return res.status(204).json(user)
      } catch (error) {
         console.error(error)
         return res.status(500).json({ error: 'Internal server error' })
      }
   }
}
