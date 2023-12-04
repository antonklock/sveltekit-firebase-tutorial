<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
	import { user } from '$lib/firebase';

	let route = $page.route.id;

	const onStepHandler = (e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void => {
		const { current } = e.detail.state;

		switch (current) {
			case 0:
				goto(`/login`, { replaceState: true });
				break;
			case 1:
				goto(`/login/username`, { replaceState: true });
				break;
			case 2:
				goto(`/login/photo`, { replaceState: true });
				break;
			default:
				console.log('Unknown step');
				break;
		}
	};
</script>

<div class="text-center w-screen pt-10">
	<h1 class="text-8xl">Links Manager</h1>
	<p class="text-xl pt-4">Where you can store your favorite links! 🔗</p>
</div>

<div class="pt-16">
	<div class="card p-4 mx-10 max-w-3xl overflow-hidden">
		<Stepper on:step={onStepHandler}>
			<Step locked={!$user}>
				<svelte:fragment slot="header">Login</svelte:fragment>
				<class slot="navigation" class="hidden">Back</class>
				<AnimatedRoute>
					<div class="card variant-filled p-4 h-80 mx-4 mt-10 mb-4">
						<slot />
					</div>
				</AnimatedRoute>
			</Step>
			<Step>
				<svelte:fragment slot="header">Username</svelte:fragment>
				<AnimatedRoute>
					<div class="card variant-filled p-4 h-80 mx-4 mt-10 mb-4">
						<slot />
					</div>
				</AnimatedRoute>
			</Step>
			<Step>
				<svelte:fragment slot="header">Photo</svelte:fragment>
				<AnimatedRoute>
					<div class="card variant-filled p-4 h-80 mx-4 mt-10 mb-4">
						<slot />
					</div>
				</AnimatedRoute>
			</Step>
		</Stepper>
	</div>
</div>
