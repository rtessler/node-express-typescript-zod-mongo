import { client } from './db'

// close database connection

global.afterAll(async () => {
    await client.close()
})