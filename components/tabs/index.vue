<template>
	<div class="vue-tab">
		<div class="vue-tab-wrapper">
			<ul ref="tabs">
				<li v-for="(tab, index) in tabs">
					<a href="javascript:void(0)" v-on:click="toTab(tab.label)" v-bind:class="classObject(tab.label)">{{ tab.label }}</a>
				</li>
			</ul>
		</div>
		<div class="vue-tab-content">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tabs',
		components: {
		},

		data: () => ({
			tabs: [],
			current: null
		}),

		mounted() {
			this.$children.forEach(item => {
				const attrs = item.$attrs
				const value = attrs.value
				// if (value && value !== '-' && value !== '?') {
					this.tabs.push({
						label: attrs.label
					});
				// }
			})

			if (this.tabs.length > 0) {
				this.current = this.tabs[0].label
			}
		},

		computed: {

			selected() {
				return this.current
			}
		},

		methods: {

			isActive(label) {
				return this.current === label
			},

			classObject(label) {
				return {
					'selected': this.isActive(label)
				}
			},

			toTab(label) {
				this.current = label
			}
		}
	}
</script>

<style type="text/css" scoped>
	.vue-tab {
		margin-top: 20px;
	}

	.vue-tab-content {
		padding: 30px;
	}

	ul {
		display: block;
		list-style-type: none;
		margin: 0 -15px;
		padding: 0 30px;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		min-height: 40px;
		border-bottom: 2px solid #f3f4f5;
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

	ul li a.selected {
		color: #344683;
		border-bottom: 2px solid #344683;
	}
</style>