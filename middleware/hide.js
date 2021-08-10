export default function ({ store, error, redirect }) {
	return error({
		statusCode: 404
	  });
}