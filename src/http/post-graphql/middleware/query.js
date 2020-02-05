let { graphql } = require('graphql')
let { makeExecutableSchema } = require('graphql-tools')

let fs = require('fs')
let path = require('path')

// 1. read resolvers
let { account, draft, drafts, save, destroy } = require('../resolvers')

// 2. read the schema
let typeDefs = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql')).toString()

// 3. combine resolvers and schema
let schema = makeExecutableSchema({ 
  typeDefs, 
  resolvers: {
    Query: { draft, drafts },
    Mutation: { account, save, destroy }
  }
})

/** graphql middleware */
module.exports = async function query(req) {
  try {
    let result = await graphql(schema, req.body.query, {}, req.session, req.body.variables, req.body.operationName)  
    return { 
      json: result
    }
  }
  catch(e) {
    return { 
      json: { error: e.name, message: e.message, stack: e.stack }
    }
  }
}
