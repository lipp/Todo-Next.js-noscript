import Link from 'next/link'
import { withRouter } from 'next/router'
import Form from './Form'

const FilterLink = withRouter(({ router, filter, name, token }) => (
  <li>
    <Link href={filter ? `/?filter=${filter}` : '/'} scroll={false}>
      <a
        className={
          (filter && router.query.filter === filter) ||
          (!filter && !router.query.filter)
            ? 'selected'
            : ''
        }
      >
        {name}
      </a>
    </Link>
    <style jsx>{`
      li {
        display: inline;
      }

      a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
      }

      a:hover {
        border-color: rgba(175, 47, 47, 0.1);
      }

      a.selected {
        border-color: rgba(175, 47, 47, 0.2);
      }
    `}</style>
  </li>
))

const Filters = () => (
  <ul>
    <FilterLink name="All" />
    <FilterLink filter="done" name="Completed" />
    <FilterLink filter="undone" name="Active" />
    <style jsx>{`
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
      }
      @media (max-width: 430px) {
        ul {
          bottom: 10px;
        }
      }
    `}</style>
  </ul>
)

const Count = ({ todosLeft }) => (
  <span>
    <strong>{todosLeft.length}</strong>{' '}
    {todosLeft.length === 1 ? 'item' : 'items'} left
    <style jsx>{`
      span {
        float: left;
        text-align: left;
      }

      span strong {
        font-weight: 300;
      }
    `}</style>
  </span>
)

const ClearButton = props => (
  <>
    <button {...props}>Clear completed</button>
    <style jsx>{`
      button {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        appearance: none;
        cursor: pointer;
      }

      button:hover {
        text-decoration: underline;
      }
    `}</style>
  </>
)

const Footer = ({ todos, token }) => {
  return (
    <footer id="footer">
      <Count todosLeft={todos.filter(todo => !todo.done)} />
      <Filters />
      {todos.some(todo => todo.done) ? (
        <Form
          hidden={{
            mutation: 'deleteTodos',
            token,
            ids: todos
              .filter(todo => todo.done)
              .map(todo => todo.id)
              .join(',')
          }}
        >
          <ClearButton type="submit" />
        </Form>
      ) : null}
      <style jsx>{`
        footer {
          color: #777;
          padding: 10px 15px;
          height: 20px;
          text-align: center;
          padding-top: 10px;
        }

        footer:before {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 50px;
          overflow: hidden;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
            0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
            0 17px 2px -6px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 430px) {
          footer {
            height: 50px;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
