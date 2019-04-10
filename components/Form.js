import { withRouter } from 'next/router'

const onSubmit = router => event => {
  event.preventDefault()
  const elements = Array.from(event.target.elements)
  const uniqueNames = Array.from(
    new Set(elements.map(el => el.name).filter(name => name !== ''))
  )
  const formData = new FormData(event.target)
  const query = uniqueNames.reduce(
    (q, name) => ({
      ...q,
      [name]: formData.get(name)
    }),
    {}
  )
  router.replace({
    pathname: router.pathname,
    query
  })
  const autoFocusElement = elements.find(el => el.autofocus)
  if (autoFocusElement) {
    autoFocusElement.focus()
  }
}

const Form = ({ router, hidden = {}, children, ...rest }) => (
  <form {...rest} onSubmit={onSubmit(router)}>
    {children}
    {Object.entries(hidden).map(([name, value]) => (
      <input key={name} type="hidden" name={name} value={value} />
    ))}
  </form>
)

export default withRouter(Form)
