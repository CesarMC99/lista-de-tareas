import 'dotenv/config'
import { Server } from './presentation/server'
// import { Router } from 'express'
import { AppRoutes } from './presentation/routes'

const main = () => {
   const server = new Server({
      port: Number(process.env.PORT) || 3000,
      routes: AppRoutes.routes,
   })
   server.start()
}

;(async () => {
   main()
})()
