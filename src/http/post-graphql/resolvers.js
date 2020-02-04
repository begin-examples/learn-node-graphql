let data = require('@begin/data')
let xss = require('xss')

module.exports = {
  account,
  draft,
  drafts,
  save,
  destroy
}

async function account(root, args, session) {
  if (!session.account)
    throw Error('not authorized')
  let copy = session.account
  delete copy.token
  return copy
}

async function draft(root, args, session) {
  return await data.get({
    table: 'drafts', 
    ...args
  })
}

async function drafts(root, args, session) {
  return await data.get({
    table: 'drafts', 
  })
}

async function save(root, draft, session) {
  if (!session.account)
    throw Error('not authorized')
  let required = ['title', 'body']//, 'author', 'avatar']
  for (let param of required) {
    if (!draft[param])
      throw ReferenceError(`missing param ${param}`)
    if (draft[param] && draft[param].length < 4)
      throw RangeError(`${param} must be four or more characters`)
  }
  draft.author = session.account.name
  draft.avatar = session.account.avatar
  draft.title = xss(draft.title)
  draft.body = xss(draft.body)
  return await data.set({
    table: 'drafts', 
    ...draft
  })
}

async function destroy(root, draft, session) {
  if (!session.account)
    throw Error('not authorized')
  return await data.destroy({
    table: 'drafts', 
    ...draft
  })
}
