<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, user, userData } from '$lib/firebase';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	let username = '';
	let loading = false;
	let isAvailable = true;

	let debounceTimer: NodeJS.Timeout;

	const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
	$: isValid = username?.length > 2 && username.length < 16 && re.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;

	async function checkAvailability() {
		clearTimeout(debounceTimer);
		isAvailable = false;
		loading = true;

		debounceTimer = setTimeout(async () => {
			console.log('Checking availability of', username);

			if (username) {
				const ref = doc(db, 'usernames', username);
				const exists = await getDoc(ref).then((doc) => doc.exists());
				isAvailable = !exists;
				loading = false;
				if (isAvailable) {
					console.log(username + ' is available');
				} else {
					console.log(username + ' is NOT available');
				}
			}
		}, 500);
	}
	async function confirmUsername() {
		console.log('Confirming username');
		const batch = writeBatch(db);
		batch.set(doc(db, 'usernames', username), { uid: $user?.uid });
		batch.set(doc(db, 'users', $user!.uid), {
			username,
			photoURL: $user?.photoURL || null,
			published: true,
			bio: 'I am the Walrus',
			links: [
				{
					title: 'test link',
					url: 'www.klockworks.studio',
					icon: 'custom'
				}
			]
		});

		await batch.commit();
	}
</script>

<AuthCheck>
	{#if $userData?.username}
		<p class="text-lg text-purple-400">
			Your username is <span class="text-green-400">@{$userData.username}</span>
		</p>
	{:else}
		<h1 class="text-3xl">Username</h1>
		<form class="mt-4 flex flex-col items-center" on:submit|preventDefault={confirmUsername}>
			<div class="flex flex-col items-start">
				<div class="flex flex-row justify-center">
					<input
						class="w-64 input mr"
						class:input-warning={isTaken}
						type="text"
						placeholder="Username"
						bind:value={username}
						on:input={checkAvailability}
					/>
					<button
						class="btn variant-filled ml-2"
						class:variant-filled-success={isAvailable && isValid && !loading}
						class:variant-filled-warning={isTaken}
						type="button"
						on:click={confirmUsername}
						disabled={!isValid || isTaken || loading}>Submit</button
					>
				</div>
				{#if loading && isTouched}
					<p class="text-sm pl-3 pt-1 text-slate-200">Checking availability of "{username}"</p>
				{/if}
				{#if !isValid && isTouched && !loading}
					<p class="text-sm pl-3 pt-1 text-yellow-200">
						Username must be 3-16 characters long, alphanumeric only
					</p>
				{/if}
				{#if !isAvailable && isTouched && !loading}
					<p class="text-sm pl-3 pt-1 text-yellow-500">"{username}" is already taken</p>
				{/if}
			</div>
		</form>
	{/if}
</AuthCheck>
