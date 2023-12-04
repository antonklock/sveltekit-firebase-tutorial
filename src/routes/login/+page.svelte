<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import Auth from '../../lib/components/Auth.svelte';
</script>

<div class="w-96">
	{#if $user}
		<h1>Welcome {$user.displayName}</h1>
		<button type="button" class="btn variant-filled-secondary" on:click={() => signOut(auth)}>
			<span>Sign out</span>
		</button>
	{:else}
		<Auth />
	{/if}
</div>
