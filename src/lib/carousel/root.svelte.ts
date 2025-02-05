export function createCarouselState() {
    let embla = $state<any>(null);
    let canScrollPrev = $state(false);
    let canScrollNext = $state(false);
    let scrollSnaps = $state<number[]>([]);
    let selectedSnap = $state(0);

    function set(instance: any) {
        embla = instance;

        function updateState() {
            if (!embla) return;

            canScrollNext = embla.canScrollNext();
            canScrollPrev = embla.canScrollPrev();
            selectedSnap = embla.selectedScrollSnap();

            // ✅ Заполняем `scrollSnaps`, если он ещё не инициализирован
            if (scrollSnaps.length === 0) {
                scrollSnaps = embla.scrollSnapList();
            }
        }

        embla.on('init', updateState);   // 🔥 Гарантируем, что `scrollSnaps` будет заполнен сразу
        embla.on('select', updateState); // ⚡ Теперь обновляется только при смене слайда

        // 🛑 Убираем слушатели при уничтожении карусели
        embla.on('destroy', () => {
            embla = null;
            canScrollNext = false;
            canScrollPrev = false;
            scrollSnaps = [];
            selectedSnap = 0;
        });

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


