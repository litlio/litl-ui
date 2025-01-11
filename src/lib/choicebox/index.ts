import Group from './group.svelte'
import Item from './item.svelte'

export { Group, Item };

const ChoiceBox: {
    Group: typeof Group,
    Item: typeof Item,
} = {
    Group,
    Item,
};

export default ChoiceBox;