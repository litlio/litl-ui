export function createCarouselState() {
    let embla = $state<any>(null);  // Храним экземпляр карусели

    // Реактивные переменные для отслеживания состояния прокрутки
    let canScrollPrev = $state(false);
    let canScrollNext = $state(false);

    // ✅ Устанавливаем карусель
    function set(instance: any) {
        embla = instance;  // Сохраняем экземпляр

        // Обновляем состояние при смене слайда
        function updateState() {
            canScrollNext = instance.canScrollNext();
            canScrollPrev = instance.canScrollPrev();
        }

        instance.on('select', updateState);
        instance.on('scroll', updateState);

        // Вызываем сразу, чтобы обновить состояние после инициализации
        updateState();
    }

    // ✅ Получаем методы скролла
    function get() {
        return {
            scrollPrev: () => embla && embla.scrollPrev(),
            scrollNext: () => embla && embla.scrollNext(),
            canScrollPrev,
            canScrollNext
        };
    }

    return { set, get };
}

