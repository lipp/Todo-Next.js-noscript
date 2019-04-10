const express = require('express')
const cookieParser = require('cookie-parser')
const next = require('next')
const nanoid = require('nanoid')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(cookieParser())
  let todos = []

  const mutations = {
    createTodo: ({ title }) => {
      const todo = {
        title,
        done: false,
        id: nanoid()
      }
      todos = [todo, ...todos]
    },
    updateTodo: ({ title, done, id }) => {
      todos = todos.map(todo =>
        todo.id === id
          ? {
              title: title === undefined ? todo.title : title,
              done: done === undefined ? todo.done : done === 'true',
              id: todo.id
            }
          : todo
      )
    },
    deleteTodo: ({ id }) => {
      todos = todos.filter(todo => todo.id !== id)
    },
    deleteTodos: ({ ids: idsString }) => {
      const ids = idsString.split(',')
      todos = todos.filter(todo => ids.indexOf(todo.id) === -1)
    },
    updateTodosDone: ({ ids: idsString, done }) => {
      const ids = idsString.split(',')
      todos = todos.map(todo =>
        ids.indexOf(todo.id) > -1
          ? { ...todo, done: done === 'true' ? true : false }
          : todo
      )
    }
  }

  server.get('/api/todos', (req, res) => {
    const { query } = req
    const mutation = mutations[query.mutation]
    if (mutation && req.cookies && query.token === req.cookies.token) {
      mutation(query)
      res.cookie('token', '')
    }
    const token = nanoid()
    res.cookie('token', token, {
      maxAge: 900000,
      httpOnly: true
    })
    res
      .json({
        result: {
          todos,
          token
        }
      })
      .end()
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
