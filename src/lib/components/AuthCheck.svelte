<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/firebase';

	function goToSignIn() {
		goto('/login', { replaceState: true });
	}
</script>

{#if $user}
	<slot />
{:else}
	{goToSignIn()}
	<h1>Please login</h1>
	<p>You must be logged in to view this page.</p>
	<a href="/login">Sign in</a>
{/if}
