import type { Snippet } from "svelte";
import type { IconProps } from '$lib/types/ui.js';

export type BadgeProps = {
  class?: string;
  color?: 
    | 'neutral'
    | 'blue'
    | 'purple'
    | 'amber'
    | 'red'
    | 'pink'
    | 'green'
    | 'teal';
  variant?: 'filled' | 'subtle' | 'outline' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconProps | undefined;
  rounded?: boolean;
  number?: number;
  children: Snippet;
};
