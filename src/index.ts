import 'dotenv/config'
import express from 'express'
import connection from './config/getDBConnection'
import route from './routes'

const db=connection()

db.on('open',()=>{
    console.log('Connection to database succesfully')
})

const app=express()

app.set('port', process.env.PORT)

app.set('host', process.env.HOST)

app.use(express.json())

app.use(route)

app.listen(app.get('port'),()=>{
    console.log(`Server on ${app.get('host')}/${app.get('port')}`)
})