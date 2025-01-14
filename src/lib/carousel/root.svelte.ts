// root.svelte.ts (или как у вас называется)
export function createCarouselState() {
    let embla = $state<any>(null);

    let isBeginning = $state(() => !embla || !embla.canScrollPrev());
    let isEnd       = $state(() => embla && !embla.canScrollNext());

    function set(instance: any) {
      embla = instance;

      instance.on('select', () => {
        console.log('[Embla] new slide selected. canScrollNext:', instance.canScrollNext());
        embla = embla;
      });
      
      
      // Если нужно обновлять "на лету" при самом скролле
      instance.on('scroll', () => {
        console.log('[Embla] scrolling… canScrollNext:', instance.canScrollNext());
        embla = embla;
      });
      
    }

    return {
      set,
      get: () => embla,
      isBeginning,
      isEnd
    };
}




