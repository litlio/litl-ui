function createTheme() {
    // Создаём реактивное состояние для темы
    let theme = $state<'system' | 'light' | 'dark'>('system');

    return {
        // Геттер для получения текущей темы
        get theme() {
            return theme; // Возвращаем текущее значение
        },
        // Сеттер для обновления темы
        setTheme(value: 'system' | 'light' | 'dark') {
            theme = value; // Обновляем значение
            localStorage.setItem('theme', value); // Сохраняем тему в localStorage
        }
    };
}

export const switcher = createTheme();



