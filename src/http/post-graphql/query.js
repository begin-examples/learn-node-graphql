let { graphql } = require('graphql')
let { makeExecutableSchema } = require('graphql-tools')
let { account, draft, drafts, save, destroy } = require('./resolvers')

let typeDefs = `

  type Account {
    id: ID!
    name: String
    avatar: String
    login: String
  }

  type Draft {
    key: ID!
    title: String
    body: String
  }

  type Query {
    draft(key: String): Draft
    drafts(cursor: String): [Draft] 
  }

  type Mutation {
    account: Account
    save(title: String!, body: String!): Draft
    destroy(key: String!): Boolean
  }
`

let resolvers = {
  Query: {draft, drafts},
  Mutation: {account, save, destroy}
}

module.exports = async function query(req) {
  let schema = makeExecutableSchema({ typeDefs, resolvers })
  return graphql(schema, req.body.query, {}, req.session, req.body.variables, req.body.operationName)  
}
