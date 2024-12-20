<script lang="ts">
	import { createCommand } from '@melt-ui/svelte';
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		...restProps
	} = $props();

	const { elements: { root }, states: { inputValue } } = createCommand({
		defaultInputValue: value
	});

	$effect(() => {
		value = $inputValue;
	});
</script>

<div
	use:root
	class={cn(
		"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
		className
	)}
	bind:this={ref}
	{...restProps}
/>
