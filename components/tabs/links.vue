<template>
	<div class="vue-tab-wrapper" ref="wrapper">
		<ul ref="tabs">
			<li v-for="(tab, index) in tabs" v-bind:class="classObject(tab.label)">
				<a href="javascript:void(0)" v-on:click="onSelected(index)">{{ tab.label }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'tab-links',
		props: ['tabs', 'current', 'onSelected'],

		data: () => ({
			realCurrent: null
		}),

		mounted() {
			if (this.tabs.length > 0) {
				this.realCurrent = this.tabs[this.current].label
			}
		},

		watch: {
			current(value) {
				this.realCurrent = this.tabs[value].label
			}
		},

		methods: {

			isActive(label) {
				return this.realCurrent === label
			},

			classObject(label) {
				return {
					'selected': this.isActive(label)
				}
			}
		}
	}
</script>

<style type="text/css" scoped>

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

	ul li.selected a {
		border-bottom: 2px solid #344683;
		color: #344683;
	}
</style>