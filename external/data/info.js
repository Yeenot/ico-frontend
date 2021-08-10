const axios = require('axios');
const prefices = require('../prefix.js')

const api = {
    blogs: {
        method: "GET",
        url: "https://api.ico-check.com/blogs",
    },
    icos: {
        method: "GET",
        url: "https://api.ico-check.com/list-icos"
    }
}

//request
function REQUEST({ method, url }) {
    return axios({
      method,
      url
    })
}



module.exports = {
    get: async function() {
        let blogs = [];
        let icos = [];
        const response = await Promise.all([REQUEST(api.blogs), REQUEST(api.icos)]);
        if (response[0] != null && response[0].status == 200) {
            const data = response[0].data;
            blogs = data.map(blog => {
                const slug = blog.slug
                const images = blog.featured_image;
                let large = null;
                if (images != null && images.hasOwnProperty("large")) {
                    large = images.large;
                }
                const obj = {
                    url: `/${prefices.blogs}/${slug}`,
                    img: [
                        {
                            url: large
                        }
                    ]
                }
                return obj
            })
        }
        if (response[1] != null && response[1].status == 200) {
            const data = response[1].data.data;
            icos = data.map(ico => {
                const slug = ico.name
                const name = ico.details["project-name"].value;
				const images = ico.images
				let logo = ''
				if (images) {
					logo = images['logo_large']
				}
				const obj = {
					url: `${slug}`,
					img: [
                            {
                            url: `https://api.ico-check.com/uploads/${logo}`,
                            title: `${name} ICO Logo`
                        }
                    ]
				}
				return obj
            })
        }
        return {
            icos,
            blogs,
            social: [
                'telegram',
                'facebook',
                'twitter',
                'alexa'
            ]
        }
    }
}