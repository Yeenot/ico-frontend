import request from 'axios'
import {
  URL as url,
  HELPERS as helpers
} from '@/api/config.js'

const call = function(json, token) {

	if (token) {
		json.headers = {
			Authorization: `bearer ${token}`
		}
	}
	return request(json)
}

export default {
  GET: () => {
    return request.get(`${url.ico}glossary`)
  },

  SAVE: (data, token) => {
  	const json = {
  		url: `${url.ico}admin/glossary`,
  		method: 'post',
  		data
  	}
    return call(json, token)
  }
}