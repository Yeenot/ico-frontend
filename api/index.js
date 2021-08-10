import request from 'axios'
import {
  URL as url,
  HELPERS as helpers
} from '@/api/config.js'

export const MAIL = {
  SUBSCRIBE: (ico, email) => {
    return {
      method: 'POST',
      url: `${url.ico}${ico}/subscribe-notification`,
      data: {
        email,
      },
      options: {
        access: true
      }
    }
  },

  NEWSLETTER: (email) => {
    return {
      method: 'POST',
      url: `${url.ico}subscribe/newsletter`,
      data: {
        email,
      },
      options: {
        access: true
      }
    }
  }
}

export const USER = {

  LOGIN: (email, password) => {
    return {
      method: 'POST',
      url: `${url.ico}auth/login`,
      data: {
        email,
        password
      },
      options: {
        access: true
      }
    }
  },

  ME: (token) => {
    return {
      method: 'GET',
      url: `${url.ico}admin/me`,
      options: {
        auth: true
      }
    }
  },

  TEST: () => {
    return {
      method: 'GET',
      url: `${url.ico}api/test`,
      options: {
        access: true
      }
    }
  }
}

export const ICOS = {

  INVESTMENT: (slug) => {
    return {
      method: 'GET',
      url: `${url.ico}${slug}/get-investment-returns`
    }
  },

  CONVERT: (params) => {
    return {
      method: 'GET',
      url: `${url.ico}currency-conversion/${params.ico}/${params.unit}`,
      options: {
        auth: true
      }
    }
  },

  SAVE: (data) => {
    return {
      method: 'POST',
      url: `${url.ico}admin/save/ico`,
      data,
      options: {
        auth: true
      }
    }
  },

  WHITELIST: () => {
    return {
      method: 'GET',
      url: `${url.ico}icos/whitelist-running`,
      options: {
        access: true
      }
    }
  },

  GET_UPDATE_SECTION: (ico) => {
    return {
      method: 'GET',
      url: `${url.ico}${ico}/update-text`,
      options: {
        auth: true
      }
    }
  },

  UPDATE_SECTION: (params) => {
    return {
      method: 'POST',
      url: `${url.ico}admin/${params.ico}/update-text`,
      data: params.data,
      options: {
        auth: true
      }
    }
  },

  ICOS_MISSING_LOGOS: () => {
    return {
      method: 'GET',
      url: `${url.ico}missing-logos`,
      options: {
        access: true
      }
    }
  },

  FEED: (ico) => {
    return {
      method: 'GET',
      url: `${url.ico}telegram/feed/${ico}`,
      options: {
        access: true
      }
    }
  },

  MEDIUM: (ico) => {
    return {
      method: 'GET',
      url: `${url.ico}medium-feed/${ico}`
    }
  },

  LOGO: (icos, token) => {
    const data = new FormData()
    icos.forEach(ico => {
      data.append(`ico[${ico.name}]`, ico.file)
    })

    return {
      method: 'POST',
      url: `${url.ico}admin/update-logo`,
      data,
      options: {
        auth: true
      },
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    }
  },

  COUNT: () => {
    return {
      method: 'GET',
      url: `${url.ico}count-ico`,
      options: {
        access: true
      }
    }
  },

   ALL: (params) => {
    return {
      method: 'GET',
      url: `${url.ico}list-icos`,
      options: {
        access: true
      }
    }
  },

  GET: (params) => {
    const append = helpers.makeParams(params)
    return {
      method: 'GET',
      url: `${url.ico}all-ico${append}`,
      options: {
        access: true
      }
    }
  },

  EACH: (project) => {
    return {
      method: 'GET',
      url: `${url.ico}ico/${project}`,
      options: {
        access: true
      }
    }
  },

  RELATED: (project) => {
    return {
      method: 'GET',
      url: `${url.ico}related-ico/${project}`,
      options: {
        access: true
      }
    }
  },

  LATEST_REVIEWS: () => {
    return {
      method: 'GET',
      url: `${url.ico}ico-ratings/latest`,
      options: {
        access: true
      }
    }
  },

  EVENTS: (params) => {
    const append = helpers.makeParams(params)
    return {
      method: 'GET',
      url: `${url.ico}ico-events${append}`,
      options: {
        access: true
      }
    }
  },

  FIELDS: () => {
    return {
      method: 'GET',
      url: `${url.ico}list-fields`,
      options: {
        access: true
      }
    }
  },

  CATEGORIES: () => {
    return {
      method: 'GET',
      url: `${url.ico}list-category`,
      options: {
        access: true
      }
    }
  },

  SAVE_CATEGORIES: (params) => {
    return {
      method: 'POST',
      url: `${url.ico}save-category`,
      data: {
        categories: params
      },
      options: {
        access: true
      }
    }
  }
}

export const cancelToken = {
  GET: () => {
    return request.CancelToken.source()
  }
}

export const SOCIAL = {
  GET: (params) => {
    return {
      method: 'GET',
      url: `${url.ico}social-stat/${params.type}/${params.interval}?status=${params.status}`,
      options: {
        access: true
      }
    }
  }
}

export const BLOGS = {
  GET: (params) => {
    const append = helpers.makeParams(params)
    return {
      method: 'GET',
      url: `${url.ico}search/blogs${append}`,
      options: {
        access: true
      }
    }
  },

  EACH: (slug) => {
    return {
      method: 'GET',
      url: `${url.ico}blogs/${slug}`,
      options: {
        access: true
      }
    }
  }
}
