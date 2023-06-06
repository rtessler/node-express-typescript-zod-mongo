import { WithId } from 'mongodb'
import * as z from 'zod'
//import { z } from ‘zod’
import { db } from '../../db'       // mongo

// define the todo schema using zod

export const TodoSchema = z.object({
    content: z.string().min(1),
    done: z.boolean().default(false)
})

// create a typescript type from the schema
// we can use the z.parse function to validate incoming data

export type Todo = z.infer<typeof TodoSchema>

// mongodb collections have _id, add _id to type

export type TodoWithId = WithId<Todo>

// return a mongodb collection

export const Todos = db.collection<Todo>('todos')