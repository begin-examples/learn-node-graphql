// mutations require req.session.account
module.exports = async function auth(req) {

  let client_id = process.env.GITHUB_CLIENT_ID
  let redirect_uri = process.env.GITHUB_REDIRECT
  let base = `https://github.com/login/oauth/authorize`
  let href = `${base}?client_id=${client_id}&redirect_uri=${redirect_uri}`

  if (!req.session.account &&
    req.body &&
    req.body.query &&
    req.body.query.startsWith('mutation')) {
    return {
      statusCode: 403,
      json: {
        error: 'not_authorized',
        message: 'please sign in',
        href
      }
    }
  }
}
