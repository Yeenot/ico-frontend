export default async function ({ store, error, redirect, router }) {
	const token = store.state.auth.token
	if (token !== '') {
		try {
			let response = await store.dispatch(`me`)
			if (response.statusText === 'OK') {
				return redirect('/admin/')
			}
		} catch(e) {
		}
	}
}