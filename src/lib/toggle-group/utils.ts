export function createGroupState(initial: {
    selected: string | string[];
    type: "single" | "multiple";
    disabled: boolean;
}) {
    let selected = $state(initial.selected);

    const get = () => selected;
    const set = (value: string | string[]) => {
        selected = value;
    };

    return {
        get,
        set,
        type: initial.type,
        disabled: initial.disabled,
    };
}

