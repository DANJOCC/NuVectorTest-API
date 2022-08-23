import 'dotenv/config'
import express from 'express'
import connection from './config/getDBConnection'
import cors from 'cors'
import { bouncer, client, project, task } from './routes'
const db=connection()

db.on('open',()=>{
    console.log('Connection to database succesfully')
})

const app=express()

app.use(cors())

app.set('port', process.env.PORT)

app.set('host', process.env.HOST)

app.use(express.json())

app.use(client)
app.use(bouncer)
app.use(project)
app.use(task)

app.listen(app.get('port'),()=>{
    console.log(`Server on ${app.get('host')}/${app.get('port')}`)
})