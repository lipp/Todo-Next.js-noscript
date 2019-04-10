import Form from './Form'
import { withRouter } from 'next/router'

const Checkbox = ({ done, ...rest }) => (
  <span>
    <button role="checkbox" aria-checked={done ? 'true' : 'false'} {...rest} />
    <style jsx>{`
      button {
        -webkit-appearance: none;
        outline: none;
        padding-top: 8px;
        padding-bottom: 4px;
        padding-left: 6px;
        padding-right: 16px;
        border: none;
        cursor: pointer;
        background: transparent;
      }
      button:focus {
        outline: none;
      }
      button::before {
        content: ' ';
        display: inline-block;
        height: 42px;
        width: 42px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      button[aria-checked='false']::before {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
      }
      button[aria-checked='true']::before {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
      }
    `}</style>
  </span>
)

const Input = props => (
  <>
    <input {...props} />
    <style jsx>{`
      input:disabled {
        text-decoration: line-through;
        color: #d9d9d9;
      }
      input {
        appearance: none;
        background: white;
        outline: none;
        border: none;
        font-size: 24px;
        margin: 0;
        width: 100%;
        height: 56px;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        color: inherit;
        padding: 6px;
        border: 1px solid white;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition: color 0.3s;
      }
      input:focus {
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        border: 1px solid #999;
      }
      input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
    `}</style>
  </>
)

const DeleteButton = props => (
  <>
    <button {...props} aria-label="Delete Todo" />
    <style jsx>{`
      button {
        width: 120px;
        border: none;
        outline: none;
        cursor: pointer;
        display: none;
        background: transparent;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
      }

      button:hover {
        color: #af5b5e;
      }

      button:after {
        content: '×';
      }

      :global(li:hover) button {
        display: block;
      }
    `}</style>
  </>
)

const Todo = ({ id, done, title, filter, token }) => (
  <li>
    <Form
      hidden={{ id, done: !done, mutation: 'updateTodo', title, filter, token }}
    >
      <Checkbox
        done={done}
        key={done}
        type="submit"
        aria-label="Toggle Button"
      />
    </Form>
    <Form hidden={{ mutation: 'updateTodo', id, done, filter, token }}>
      <Input
        type="text"
        name="title"
        aria-label="Todo title"
        key={title}
        defaultValue={title}
        required
        disabled={done}
      />
    </Form>
    <Form hidden={{ mutation: 'deleteTodo', id, filter, token }}>
      <DeleteButton type="submit" />
    </Form>
    <style jsx>{`
      li {
        background: white;
        display: grid;
        grid-template-columns: 60px 1fr 50px;
        align-items: center;
        border-bottom: 1px solid #ededed;
        height: 58px;
        position: relative;
      }
    `}</style>
  </li>
)

const getVisibleTodos = ({ todos, filter }) => {
  if (filter === 'undone') {
    return todos.filter(todo => !todo.done)
  } else if (filter === 'done') {
    return todos.filter(todo => todo.done)
  } else {
    return todos
  }
}

const Todos = withRouter(({ router, todos, token }) => (
  <ul>
    {getVisibleTodos({ todos, filter: router.query.filter }).map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        filter={router.query.filter}
        token={token}
      />
    ))}
    <style jsx>{`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `}</style>
  </ul>
))

export default Todos
