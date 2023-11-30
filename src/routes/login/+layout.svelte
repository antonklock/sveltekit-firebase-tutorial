<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {
		const { current } = e.detail.state;

		if (current === 0) {
			goto(`/login`, { replaceState: true });
			return;
		} else if (current === 1) {
			goto(`/login/username`, { replaceState: true });
			return;
		} else if (current === 2) {
			goto(`/login/photo`, { replaceState: true });
			return;
		}
	}
</script>

<div class="text-center w-screen pt-10">
	<h1 class="text-8xl">Links Manager</h1>
	<p class="text-xl pt-4">Where you can store your favorite links! 🔗</p>
</div>

<div class="pt-16">
	<div class="card p-4 mx-10 max-w-3xl">
		<Stepper on:step={onStepHandler}>
			<Step>
				<svelte:fragment slot="header">Login</svelte:fragment>
				<div class="card variant-filled p-4 h-80 mx-4 mt-10 mb-4">
					<slot />
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">Username</svelte:fragment>
				<div class="card variant-filled p-4 h-80 mx-4 mt-10 mb-4">
					<slot />
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">Photo</svelte:fragment>
				<div class="card variant-filled p-4 h-80 mx-4 mt-10 mb-4">
					<slot />
				</div>
			</Step>
		</Stepper>
	</div>
</div>
