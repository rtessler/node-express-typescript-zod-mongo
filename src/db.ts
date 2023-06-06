import { MongoClient } from 'mongodb'

const {
    MONGO_URI = 'mongodb://localhost/todo-api'
} = process.env

console.log('db.ts: MONGP_IRI: ' + MONGO_URI)

export const client = new MongoClient(MONGO_URI)
export const db = client.db()

// mongo will automatically connect

//await client.connect()