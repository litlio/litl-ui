import Root from './root.svelte';
import Button from './button.svelte';
import Content from './content.svelte';
import Item from './item.svelte';
import Link from './link.svelte';

export { Root, Button, Content, Item, Link };

const Menu: {
    Root: typeof Root,
    Button: typeof Button,
    Content: typeof Content,
    Item: typeof Item,
    Link: typeof Link,
} = {
    Root,
    Button,
    Content,
    Item,
    Link,
};

export default Menu;
