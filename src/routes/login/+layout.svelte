<script lang="ts">
	import { user, auth, userData } from '$lib/firebase';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let progress = 0;
	let authenticated = false;
	let username = '';

	userData.subscribe((data) => {
		if (data?.username) {
			progress = 2;
			goto('/login/photo', { replaceState: true });
		}
	});

	user.subscribe(() => {
		if ($user) {
			progress = 1;
			goto('/login/username', { replaceState: true });
			authenticated = true;
		} else {
			progress = 0;
			authenticated = false;
		}
	});

	function updateProgress() {
		switch ($page.route.id) {
			case '/login':
				progress = 0;
				console.log('/login');
				break;

			case '/login/username':
				progress = 1;
				console.log('/login/username');
				break;

			case '/login/photo':
				progress = 2;
				console.log('/login/photo');
				break;

			default:
				progress = 0;
				console.log('no such route');
				break;
		}
	}
</script>

<div class="flex flex-col items-center w-screen pt-10">
	<h1 class="text-8xl">Links Manager</h1>
	<p class="text-xl pt-4">Where you can store your favorite links! 🔗</p>
</div>

<div class="flex flex-col items-center pt-16">
	<RadioGroup class="mb-10">
		<RadioItem
			on:click={() => {
				goto('/login', { replaceState: true });
			}}
			bind:group={progress}
			name="justify"
			value={0}
			disabled={false}>1</RadioItem
		>
		<RadioItem
			on:click={() => {
				goto('/login/username', { replaceState: true });
			}}
			bind:group={progress}
			name="justify"
			value={1}
			disabled={!$user}>2</RadioItem
		>
		<RadioItem
			on:click={() => {
				goto('/login/photo', { replaceState: true });
			}}
			bind:group={progress}
			name="justify"
			value={2}
			disabled={!$userData?.username}>3</RadioItem
		>
	</RadioGroup>

	<div>
		<slot />
	</div>
</div>
