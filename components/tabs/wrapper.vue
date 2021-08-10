<template>
	<div class="vue-tab">
		<div class="vue-tab-content">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tab-wrapper',
		props: ['current'],

		components: {
		},

		data: () => ({
			tabs: [],
			selected: null
		}),

		mounted() {
			this.$children.forEach(item => {
				const attrs = item.$attrs
				this.tabs.push({
					label: attrs.label
				});
			})

			if (this.tabs.length > 0) {
				this.selected = this.tabs[0].label
			}
		},

		watch: {
			current(value) {
				this.selected = this.tabs[value].label
			}
		},

		methods: {
		}
	}
</script>

<style type="text/css" scoped>

	.vue-tab-wrapper {
	}

	ul {
		display: block;
		list-style-type: none;
		margin: 0;
		padding: 0;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		min-height: 40px;
	}

	ul li {
		position: relative;
		display: inline-block;
	}

	ul li a {
		position: relative;
		display: block;
		padding: 10px 15px;
		text-decoration: none;
		color: inherit;
	}
</style>