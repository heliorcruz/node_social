// config/initializers/social.js
var request = require('request-promise')

module.exports = {

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  facebook: function (auth, callback) {
    // you need permission for most of these fields
    const userFieldSet = 'id, name, about, email, accounts, link, is_verified'
    const options = {
      method: 'GET',
      uri: `https://graph.facebook.com/v2.8/${auth.userId}`,
      qs: {
        access_token: auth.accessToken,
        fields: userFieldSet
      }
    }
    request(options)
    .then(fbRes => {
      // parse the result and organize data
      var data = JSON.parse(fbRes)
      // add fields to object
      auth.facebook = data
      auth.email = data.email
      auth.name = data.name
      auth.provider = 'FACEBOOK'
      return callback(null, auth)
    })
    .catch(function (err) {
      console.log(err)
      return callback(err, null)
    })
  },

  // =========================================================================
  // GOOGLE   ================================================================
  // =========================================================================
  google: function (auth, callback) {
    const options = {
      method: 'GET',
      uri: `https://www.googleapis.com/oauth2/v3/userinfo`,
      qs: {
        access_token: auth.accessToken
      }
    }
    request(options)
    .then(ggRes => {
      // parse the result and organize data
      var data = JSON.parse(ggRes)
      // add fields to object
      auth.google = data
      auth.email = data.email
      auth.name = data.name
      auth.provider = 'GOOGLE'
      return callback(null, auth)
    })
    .catch(function (err) {
      return callback(err, null)
    })
  }

}
