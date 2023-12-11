<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user, userData, storage, db } from '$lib/firebase';
	import { Avatar, FileButton, ProgressRadial } from '@skeletonlabs/skeleton';
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let previewURL: string | undefined;
	let uploading = false;
	let file: any;

	async function upload(e: any) {
		uploading = true;
		const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);

		await updateDoc(doc(db, 'users', $user!.uid), { photoURL: url });
		previewURL = undefined;
		uploading = false;
	}

	function setFile(e: any) {
		file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
	}
</script>

<AuthCheck>
	<form class="flex flex-col items-center form-control w-full max-w-xs my-10 mx-auto text-center">
		<h2 class="card-title">Upload a Profile Photo</h2>
		<div class="flex flex-col items-center form-control w-full max-w-xs my-4 mx-auto text-center">
			{#if !uploading}
				{#if previewURL}
					<button
						on:click={() => {
							if (previewURL) {
								previewURL = undefined;
							}
						}}
						class="btn-icon variant-filled btn-icon-sm self-end mr-4 mt-4 px-2 absolute text-red-400 font-black drop-shadow-lg z-10"
						>X</button
					>
				{/if}

				<div class="flex items-center justify-center w-40 h-40 rounded-full overflow-hidden">
					<Avatar
						src={previewURL ?? $userData?.photoURL ?? '/user.png'}
						alt="User photo"
						width="256"
						height="256"
						class="rounded-full"
					/>
				</div>

				<div class="flex flex-col items-center">
					{#if !previewURL}
						<FileButton
							on:change={setFile}
							name="photoURL"
							type="file"
							class="mt-4"
							accept="image/png, image/jpg, image/gif, image/webp"
						>
							Pick an image
						</FileButton>
					{:else}
						<button on:click={upload} class="btn variant-filled mt-4">Upload</button>
					{/if}
				</div>
			{:else}
				<div class="flex flex-col items-center mt-6">
					<ProgressRadial value={undefined} class="w-14" />
					<label for="photoURL" class="label">
						<span class="label-text">Uploading...</span>
					</label>
					<!-- <button type="button" class="btn variant-filled mt-12">Cancel</button> -->
				</div>
			{/if}
			<!-- <FileButton name="photoURL" class="w-full max-w-xs" /> -->
		</div>
	</form>
</AuthCheck>

<!-- <input
				on:change={upload}
				name="photoURL"
				type="file"
				class="file-input file-input-bordered w-full max-w-xs"
				accept="image/png, image/jpg, image/gif, image/webp"
				class:variant-ringed-warning={uploading}
				disabled={uploading}
			/> -->
