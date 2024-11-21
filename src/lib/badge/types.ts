import type { Component, Snippet } from 'svelte';

export type BadgeProps = {
  class?: string;
  variant?:
    | 'neutral'
    | 'neutral-subtle'
    | 'blue'
    | 'blue-subtle'
    | 'purple'
    | 'purple-subtle'
    | 'amber'
    | 'amber-subtle'
    | 'red'
    | 'red-subtle'
    | 'pink'
    | 'pink-subtle'
    | 'green'
    | 'green-subtle'
    | 'teal'
    | 'teal-subtle'
    | 'inverted';
  size?: 'sm' | 'md' | 'lg';
  icon?: Component | undefined;
  children: Snippet;
};
