<script>
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
</script>

<h1>Sign in</h1>

<button type="button" class="btn variant-filled-primary" on:click={signInWithGoogle}>
	<span>Sign in with Google</span>
</button>
