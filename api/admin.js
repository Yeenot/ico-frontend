import request from 'axios'
import {
  URL as url,
  HELPERS as helpers
} from '@/api/config.js'

const admin = `${url.ico}admin/`

export default {
  ICO: {
    UPLOAD: (file) => {
      const data = new FormData()
      data.append(`uploaded_file`, file)

      return {
        method: 'POST',
        url: `${admin}upload/spreadsheet`,
        data,
        options: {
          auth: true
        },
        headers: {
          'Content-Type': `multipart/form-data`,
        }
      }
    }
  },

  SETTINGS: {
    SAVE_CATEGORIES: (params) => {
      return {
        method: 'POST',
        url: `${admin}save-category`,
        data: {
          categories: params
        },
        options: {
          access: true,
          auth: true
        }
      }
    }
  },

  ARTICLES: {
    SAVE: (params) => {
      const data = new FormData()

      for (const key of Object.keys(params)) {
        data.append(key, params[key])
      }

      return {
        method: 'POST',
        url: `${admin}blogs`,
        data,
        options: {
          auth: true
        },
        headers: {
          'Content-Type': `multipart/form-data`,
        }
      }
    }
  }
}