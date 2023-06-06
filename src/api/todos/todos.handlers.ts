import { Request, Response, NextFunction } from 'express'
import { InsertOneResult } from 'mongodb'
import { TodoWithId, Todo, Todos, TodoSchema } from './todos.model'
import { ZodError } from 'zod'

export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) { 

    try {
        const result =  Todos.find()
        const todos = await result.toArray()
        res.json(todos)
    }
    catch (error) {
        next(error)
    }
}

export async function createOne(
    req: Request<{}, InsertOneResult<Todo>, Todo>, 
    res: Response<InsertOneResult<Todo>>, 
    next: NextFunction) { 

    try {
        const validateResult =  TodoSchema.parse(req.body)
        const insertResult = await Todos.insertOne(validateResult)
        return res.json(insertResult)
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(422)
        }
        // goto the next bit of middleware
        next(error)
    }
}

// method 1

// router.get<{}, Todo[]>('/', (req, res) => { 
//     res.json([
//         {
//             content: 'Learn Typescript',
//             done: false
//         }
//     ])
// })

// method 2

// router.get('/', async (req: Request, res: Response<TodoWithId[]>) => { 
//     const result = await Todos.find()
//     const todos = await result.toArray()

//     res.json(todos)

//     // res.json([
//     //     {
//     //         content: 'Learn Typescript',
//     //         done: false
//     //     }
//     // ])
// })
