export default async function ({ store, error, redirect }) {
	try {
		let response = await store.dispatch(`me`)
	} catch(e) {
		redirect('/login')
	}
}