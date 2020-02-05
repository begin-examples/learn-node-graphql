let arc = require('@architect/functions')
let query = require('./middleware/query')
let auth = require('./middleware/auth')

exports.handler = arc.http.async(auth, query)
