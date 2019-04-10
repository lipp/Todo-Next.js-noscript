import { withRouter } from 'next/router'
import Form from './Form'

const ToggleAllButton = ({ checked = false, visible }) => (
  <>
    <button
      type="submit"
      aria-checked={checked.toString()}
      role="checkbox"
      aria-label="Toggle all button"
    />
    <style jsx>{`
      button {
        border: none; /* Mobile Safari */
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        outline: none;
        background: transparent;
        opacity: ${visible ? '1' : '0'};
      }

      button::after {
        width: 27px;
        height: 27px;
        position: absolute;
        transform: translate(-50%, -45%) rotate(90deg);
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
      }

      button[aria-checked='true']::after {
        color: #737373;
      }
    `}</style>
  </>
)

const Input = props => (
  <>
    <input {...props} />
    <style jsx>{`
      input {
        background: transparent;
        outline: none;
        font-size: 24px;
        margin: 0;
        width: 100%;
        height: 65px;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        color: inherit;
        border: 1px solid white;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 16px 16px 16px 6px;
        border: none;
      }
      input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
    `}</style>
  </>
)

const NewTodo = withRouter(
  ({
    todos,
    token,
    router: {
      query: { filter, mutation }
    }
  }) => (
    <div>
      <Form
        hidden={{
          mutation: 'updateTodosDone',
          filter,
          ids: todos.map(todo => todo.id).join(','),
          done: todos.some(todo => !todo.done),
          token
        }}
      >
        <ToggleAllButton
          key={todos.every(todo => todo.done)}
          checked={todos.every(todo => todo.done)}
          visible={todos.length > 0}
        />
      </Form>
      <Form hidden={{ mutation: 'createTodo', token, filter }}>
        <Input
          type="text"
          name="title"
          defaultValue=""
          placeholder="What needs to be done?"
          aria-label="New todo title"
          key={token}
          required
          autoFocus={todos.length === 0 || mutation === 'createTodo'}
        />
      </Form>
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: 60px 1fr;
          background: rgba(0, 0, 0, 0.003);
          box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  )
)

export default NewTodo
