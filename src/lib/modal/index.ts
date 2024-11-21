import Root from './root.svelte';
import Body from './body.svelte';
import Content from './content.svelte';
import Header from './header.svelte';
import Title from './title.svelte';
import Subtitle from './subtitle.svelte';
import Text from './text.svelte';
import Footer from './footer.svelte';
import Action from './action.svelte';

const Modal: {
    Root: typeof Root,
    Body: typeof Body,
    Content: typeof Content,
    Header: typeof Header,
    Title: typeof Title,
    Subtitle: typeof Subtitle,
    Text: typeof Text,
    Footer: typeof Footer,
    Action: typeof Action,
} = {
    Root,
    Body,
    Content,
    Header,
    Title,
    Subtitle,
    Text,
    Footer,
    Action
};

export default Modal;
