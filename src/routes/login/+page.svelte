<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import Auth from '../../lib/components/Auth.svelte';
	import SignOut from '$lib/components/SignOut.svelte';
</script>

<div class="flex flex-col items-center p-4 w-96">
	{#if $user}
		<h1>Welcome {$user.displayName}</h1>
		<SignOut />
	{:else}
		<Auth />
	{/if}
</div>
