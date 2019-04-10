import 'isomorphic-unfetch'
import nanoid from 'nanoid'
import querystring from 'querystring'

const getHost = req => {
  const host = req
    ? `http://localhost:3000`
    : `${window.location.protocol}//${window.location.host}`
  return host
}

const getTodosEndpoint = req => {
  return `${getHost(req)}/api/todos`
}

export const fetchTodos = async ({ res, req, query }) => {
  const response = await fetch(
    `${getTodosEndpoint(req)}/?${querystring.encode(query)}`,
    {
      headers: {
        cookie: req ? req.headers.cookie : null
      }
    }
  )
  const json = await response.json()
  if (res) {
    const token = nanoid()
    res.cookie('token', token, {
      maxAge: 900000,
      httpOnly: true
    })
    return {
      ...json.result,
      token
    }
  }
  return json.result
}
