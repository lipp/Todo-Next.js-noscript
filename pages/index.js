import Head from 'next/head'

import Todos from '../components/Todos'
import NewTodo from '../components/NewTodo'
import Footer from '../components/Footer'

import * as api from '../api'

const App = ({ todos, token }) => (
  <div>
    <Head>
      <title>Todos-App (noscript compat)</title>
    </Head>
    <h1>todo</h1>
    <NewTodo todos={todos} token={token} />
    <Todos todos={todos} token={token} />
    {todos.length > 0 ? <Footer todos={todos} token={token} /> : null}
    <style jsx>{`
      div {
        background: #fff;
        margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
          0 25px 50px 0 rgba(0, 0, 0, 0.1);
      }

      h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
      }

      :global(body) {
        margin: 0;
        padding: 0;
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
      }
    `}</style>
  </div>
)

App.getInitialProps = api.fetchTodos

export default App
