const axios = require('axios');

module.exports = function maintenance (req, res, next) {

	function toError() {
        next({ statusCode: 503 })
	}
	axios.get(`https://api.ico-check.com/count-ico`).then((response) => {
    if (response.statusText !== 'OK') {
        toError()
      } else {
        next()
      }
    }).catch((error) => {
        toError()
    })
}