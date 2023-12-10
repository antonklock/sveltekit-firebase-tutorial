<script lang="ts">
	import { user, userData } from '$lib/firebase';
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	$user;
	$userData;
</script>

<div class="flex flex-col items-center">
	<slot />
</div>
