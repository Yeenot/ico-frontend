const { Minimatch } = require('minimatch')
const sm = require('sitemap')
const isHTTPS = require('is-https')
const { union, uniq } = require('lodash')
const path = require('path')
const fs = require('fs-extra')
const AsyncCache = require('async-cache')
const pify = require('pify')
const { hostname } = require('os')

const defaults = {
	'default': {
		path: '/sitemap.xml',
		hostname: null,
		exclude: [],
		routes: []
	}
}

module.exports = function nuxtSitemap (moduleOptions) {
	const options = {}
	for (const key of Object.keys(moduleOptions)) {
		const configs = moduleOptions[key]
		options[key] = {}
		for(const keyConfig of Object.keys(configs)) {
			const config = configs[keyConfig]
			options[key][keyConfig] = config
		}
		options[key] = Object.assign({}, defaults[key], options[key])
	}
	const jsonStaticRoutesPath = path.resolve(this.options.buildDir, path.join('dist', 'sitemap-routes.json'))

	let collection = fs.readJsonSync(jsonStaticRoutesPath, { throws: false })
	let cache = null;

	if (collection && !this.options.dev) {
		cache = createCache(collection, options);

		for (const key of Object.keys(cache)) {
			cache[key].get('routes')
		}
	}

	this.extendRoutes(routes => {
		let nRoutes = []
		routes.forEach(route => {
			const childrenRoutes = getNestedRoutes(route)

			if (childrenRoutes.length > 0) {
				nRoutes = nRoutes.concat(childrenRoutes)
			} else {
				nRoutes.push({
					url: route.path
				})
			}
		})

		let finalRoutes = nRoutes
		.map(r => { 
			return { url: r.url }
		})
		.filter(r => !r.url.includes(':') && !r.url.includes('*'))

		const collection = {}
		for (const key of Object.keys(options)) {
			collection[key] = finalRoutes;
		}
		for (const key of Object.keys(options)) {
			const option = options[key]
			option.exclude.forEach(pattern => {
				const minimatch = new Minimatch(pattern)
				minimatch.negate = true
				collection[key] = collection[key].filter(route => minimatch.match(route.url))
			})
		}

		if (this.options.dev || options.generate) {
			cache = createCache(collection, options);
		}

		if (!this.options.dev) {
			fs.ensureDirSync(path.resolve(this.options.buildDir, 'dist'))
			fs.writeJsonSync(jsonStaticRoutesPath, collection)
		}
	})

	for (const key of Object.keys(options)) {
		const option = options[key]
		this.addServerMiddleware({
			path: option.path,
			handler (req, res, next) {
				cache[key].get('routes')
				.then(routes => createSitemap(option, routes, req))
				.then(sitemap => sitemap.toXML())
				.then(xml => {
					res.setHeader('Content-Type', 'application/xml')
					res.end(xml)
				}).catch(err => {
					next(err)
				})
			}
		})
	}
}

function getNestedRoutes(route) {
	let routes = []
	const parent = route.path
	const children = route.children
	if (children) {
		children.forEach(child => {
			const path = child.path
			let fullPath = parent
			if (path) {
				fullPath = fullPath + '/' + path
			}
			routes.push({
				url: fullPath
			})
			routes = routes.concat(getNestedRoutes(child))
		})
	}
	return routes
}

// Initialize a fresh sitemap instance
function createSitemap (options, routes, req) {
	const sitemapConfig = {}

  // Set sitemap hostname
  sitemapConfig.hostname = options.hostname ||
  (req && `${isHTTPS(req) ? 'https' : 'http'}://${req.headers.host}`) || `http://${hostname()}`
	
  // Set urls and ensure they are unique
  sitemapConfig.urls = uniq(routes)

  // Set cacheTime
  sitemapConfig.cacheTime = options.cacheTime || 0

  // Create promisified instance and return
  const sitemap = sm.createSitemap(sitemapConfig)
  sitemap.toXML = pify(sitemap.toXML)

  return sitemap
}

// Initialize a AsyncCache instance for
function createCache (staticRoutes, options) {
	const cache = {}
	for (const key of Object.keys(options)) {
		cache[key] = new AsyncCache({
			maxAge: options[key].cacheTime,
			load (_, callback) {
				promisifyRoute(options[key].routes)
				.then(routes => {

					const clone = []
					routes.forEach(route => {
						clone.push(route)
					})

					const merged = []
					staticRoutes[key].forEach(route => {
						let exist = false
						let index = -1
						clone.forEach((userRoute, id) => {
							if (route.url == userRoute.url) {
								index = id
								exist = true
								merged.push(userRoute)
								return
							}
						})

						if (!exist) {
							merged.push(route)
						} else {
							clone.splice(index, 1)
						}
					})

					return merged.concat(clone)
				})
				.then(routes => {
					callback(null, routes)
				})
				.catch(err => {
					callback(err)
				})
			}
		})
		cache[key].get = pify(cache[key].get)
	}
	return cache
}

// Borrowed from nuxt/common/utils
function promisifyRoute (fn) {
  // If routes is an array
  if (Array.isArray(fn)) {
  	return Promise.resolve(fn)
  }
  // If routes is a function expecting a callback
  if (fn.length === 1) {
  	return new Promise((resolve, reject) => {
  		fn(function (err, routeParams) {
  			if (err) {
  				reject(err)
  			}
  			resolve(routeParams)
  		})
  	})
  }
  let promise = fn()
  if (!promise || (!(promise instanceof Promise) && (typeof promise.then !== 'function'))) {
  	promise = Promise.resolve(promise)
  }
  return promise
}