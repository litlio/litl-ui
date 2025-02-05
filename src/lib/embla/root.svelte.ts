export function createCarouselState() {
    let embla = $state<any>(null);
    let canScrollPrev = $state(false);
    let canScrollNext = $state(false);
    let scrollSnaps = $state<number[]>([]);
    let selectedSnap = $state(0);

    function set(instance: any) {
        embla = instance;

        function updateState() {
            if (!instance) return;

            canScrollNext = instance.canScrollNext();
            canScrollPrev = instance.canScrollPrev();

            // ✅ Заполняем `scrollSnaps`, если он ещё не инициализирован
            if (scrollSnaps.length === 0) {
                scrollSnaps = instance.scrollSnapList();
            }

            // ✅ Обновляем `selectedSnap` только в `select`
            selectedSnap = instance.selectedScrollSnap();
        }

        instance.on('select', updateState); // ⚡ Теперь обновляется только при смене слайда
        instance.on('init', updateState); // 🔥 Гарантируем, что `scrollSnaps` будет заполнен сразу

        updateState(); // Вызываем сразу после инициализации
    }

    function get() {
        return {
            scrollPrev: () => embla?.scrollPrev(),
            scrollNext: () => embla?.scrollNext(),
            scrollTo: (index: number) => embla?.scrollTo(index),
            canScrollPrev,
            canScrollNext,
            scrollSnaps,
            selectedSnap
        };
    }

    return { set, get };
}

