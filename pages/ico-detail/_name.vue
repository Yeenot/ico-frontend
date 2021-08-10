<template>
</template>

<script>
export default {

  fetch ({ params, redirect }) {
  	const ico = params.name
  	if (ico) {
  		redirect(301, '/' + ico)
  	} else {
  		redirect(301, '/')
  	}
  }
}
</script>