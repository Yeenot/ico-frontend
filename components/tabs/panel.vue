<template>
	<div class="vue-tab-panel" v-if="isActive">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'tab-panel',

		data: () => ({
			label: null,
			isActive: false
		}),

		mounted() {
			this.label = this.$attrs.label
		},

		computed: {
		},

		watch: {
			'$parent.selected' (label) {
				if (this.label === label) {
					this.isActive = true
				} else {
					this.isActive = false
				}
			}
		}
	}
</script>