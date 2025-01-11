/**
 * Attaches a click event listener to detect clicks outside a specific element.
 *
 * @param {HTMLElement} node - The element to detect outside clicks for.
 * @param {Function} fn - Callback function triggered when a click occurs outside the node.
 * @returns {Object} - An object with a `destroy` method to remove the listener.
 */
export const clickOutside = (
    node: HTMLElement,
    fn: (event: Event) => void
): { destroy(): void } => {
    if (typeof document === 'undefined') {
        return {
            destroy: () => {}
        };
    }

    const handleClick = (event: Event) => {
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            fn(event);
        }
    };

    document.body.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.body.removeEventListener('click', handleClick, true);
        }
    };
};

/**
 * Attaches a click event listener to detect any clicks anywhere in the document.
 *
 * @param {Function} fn - Callback function triggered on any click.
 * @returns {Object} - An object with a `destroy` method to remove the listener.
 */
/**
 * Adds a global click listener and triggers the callback when clicking anywhere in the document.
 *
 * @param {HTMLElement} node - The DOM element where the directive is applied.
 * @param {(event: Event) => void} callback - The callback function to execute on a click.
 * @returns {{ destroy(): void }} - An object with a `destroy` method to remove the event listener.
 */
export const clickAnywhere = (
    node: HTMLElement,
    callback: (event: Event) => void
): { destroy(): void } => {
    if (typeof document === 'undefined') {
        return { destroy: () => {} };
    }

    const handleClick = (event: Event) => {
        if (!node.contains(event.target as Node) && !event.defaultPrevented) {
            callback(event);
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};


