<template>
	<div class="app">
		<self-header/>
		<div class="app-body">
			<main class="main">
				<div class="container-fluid">
					<router-view></router-view>
				</div>
			</main>
		</div>
		<self-footer/>
	</div>
</template>
<script>
	import { HeaderLogisticsTrace, Footer } from 'views/layout/components'

	export default {
		name: 'full',
		components: {
			'self-header': HeaderLogisticsTrace,
			'self-footer': Footer
		},
		computed: {}
	}

</script>
<style lang="scss">
	.main {
		min-width: 1200px;
		margin: 0 auto;
	}
</style>