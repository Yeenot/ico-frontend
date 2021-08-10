const axios = require('axios');
const requestIp = require('request-ip');
var Cookie = require('cookie')

module.exports = async function security (req, res, next) {
  //Cookies
  const cookieStr = req.headers.cookie;
  const cookies = Cookie.parse(cookieStr || '') || {};
  let token = cookies['access_token'];
  function setToken(token) {
    var date = new Date();
    var minutes = 30;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    var dateUTC = date.toUTCString()
    res.setHeader('Set-Cookie', [`access_token=${token};expires=${dateUTC};`]);
    next()
  }

  if (!token) {
    const clientIp = requestIp.getClientIp(req);
    const agent = req.headers['user-agent']

    const response = await axios.post(`https://api.ico-check.com/api/request-access`, {
      'client_ip': clientIp,
      'user_agent': agent
    })
    if (response.statusText === 'OK') {
      setToken(response.data.client_id)
    } else {
      next()
    }
  } else {
    next()
  }
    
}