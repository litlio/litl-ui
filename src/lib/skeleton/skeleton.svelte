<script lang="ts">
    // Пропсы для компонента Skeleton
    export type SkeletonProps = {
      class: string;
      pulse?: boolean;
      rounded?: boolean;
    };

    let { class: className, pulse = true, rounded }: SkeletonProps = $props();
  
    let skeletonClass = $derived.by(() => {
      return `
        ${className} 
        ${pulse ? 'animate-pulse' : ''}
        ${rounded ? 'rounded-full' : ''}
        bg-neutral-100 dark:bg-neutral-800
      `;
    });
</script>

<div class={skeletonClass}></div>


  
  
  
  
  
  
  
  
  
  
  
  
  