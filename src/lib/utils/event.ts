/**
 * Attaches a click event listener to the document body that triggers the provided function
 * when a click event occurs outside of the specified node.
 *
 * @param {HTMLElement} node - The element to check for outside clicks.
 * @param {F} fn - The function to be triggered when a click occurs outside of the node.
 * @return {Object} An object with a `destroy` method to remove the event listener.
 */
export const clickOutside = (node: HTMLElement, fn: (event: Event) => void): { destroy(): void } => {
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

export const clickAnywhere = (fn: (event: Event) => void): { destroy(): void } => {
    if (typeof document === 'undefined') {
        return {
            destroy: () => {
            }
        };
    }

    const handleClick = (event: Event) => {
        fn(event);
    };
    document.body.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.body.removeEventListener('click', handleClick, true);
        }
    };
};
