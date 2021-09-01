let arc = require('@architect/functions')

async function logout () {
  return {
    session: {},
    location: '/'
  }
}

exports.handler = arc.http.async(logout)
