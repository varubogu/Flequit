<script lang="ts">
  import { tv, type VariantProps } from "tailwind-variants";
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  const badgeVariants = tv({
    base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  type Props = {
    variant?: VariantProps<typeof badgeVariants>["variant"];
    class?: string;
    children?: Snippet;
    style?: string;
  };

  let {
    class: className,
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
</script>

<div class={cn(badgeVariants({ variant }), className)} {...restProps}>
  {@render children?.()}
</div>