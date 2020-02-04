let arc = require('@architect/functions')
let query = require('./query')
let auth = require('./auth')

async function graphql(req) {
  return { 
    json: await query(req)  
  }
}

exports.handler = arc.http.async(auth, graphql)
