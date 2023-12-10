<script>
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
</script>

<AuthCheck>
	<button type="button" class="btn variant-filled" on:click={() => signOut(auth)}>
		<span>Sign out</span>
	</button>
</AuthCheck>
