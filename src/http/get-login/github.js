let tiny = require('tiny-json-http')

module.exports = async function github(req) {

  // trade the code for an access token
  let result = await tiny.post({
    url: 'https://github.com/login/oauth/access_token',
    headers: {Accept: 'application/json'},
    data: {
      code: req.query.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT,
    }
  })

  let token = result.body.access_token

  // use the access token to get the user account
  let user = await tiny.get({
    url: `https://api.github.com/user?access_token=${token}`,
    headers: {Accept: 'application/json'},
  })

  // create a clean acccount obj
  return {
    token,
    name: user.body.name,
    login: user.body.login,
    id: user.body.id,
    url: user.body.url,
    avatar: user.body.avatar_url
  }
}
