<script lang="ts">

    /* Components */
    import Accordion from "$lib/accordion/index.js";
    import Avatar from "$lib/avatar/avatar.svelte";
    import Badge from "$lib/badge/badge.svelte";
    import Button from "$lib/button/button.svelte";
    import Card from "$lib/card/index.js";
    import Checkbox from "$lib/checkbox/checkbox.svelte";
    import ContextMenu from "$lib/context-menu/index.js";
    import Input from "$lib/input/input.svelte";
    import SearchInput from "$lib/input/searchInput.svelte";
    import Menu from "$lib/menu/index.js";
    import Modal from "$lib/modal/index.js";
    import Progress from "$lib/progress/progress.svelte";
    import ScrollArea from "$lib/scroll-area/index.js";
    import Select from "$lib/select/index.js";
    import Separator from "$lib/separator/separator.svelte";
    import Tabs from "$lib/tabs/tabs.svelte";
    import TextArea from "$lib/textarea/textarea.svelte";
    import Toggle from "$lib/toggle/toggle.svelte";
    import Tooltip from "$lib/tooltip/tooltip.svelte";

    /* Icons */
    import ChevronRight from "$lib/icons/ChevronRight.svelte";
    import ElipsisHorisontal from "$lib/icons/ElipsisHorisontal.svelte";
    import ChevronDown from "$lib/icons/ChevronDown.svelte";
  
    /* State */
    let items = $state(['avatar', 'choicebox']);
    let value = $state('');
    let active = $state(false);
    let dynamic = $state(0);
    let selected = $state('apple');
  
    let blocks = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  </script>
  
  <main class="bg-neutral-50 dark:bg-neutral-950 flex justify-center p-4">
    <div class="w-[600px] flex flex-col gap-4">
  
        <h1 class="text-xl font-bold text-gray-800 mb-4 text-center">
        Component Showcase
        </h1>

        <!-- Accordion -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">Accordion</h2>
            <div class="flex flex-wrap gap-4">
    
                <Accordion.Root>
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Question A</Accordion.Trigger>
                    <Accordion.Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>Question B</Accordion.Trigger>
                    <Accordion.Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Content>
                </Accordion.Item>
                </Accordion.Root>
    
    
            </div>
        </div>
  
        <!-- Avatar -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Avatar Variants</h2>
        <div class="flex flex-col gap-4">
            <Avatar name="Joe Middle" img="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"/>
            <Avatar name="Mary" />
            <Avatar name="John Doe" />
        </div>
        </div>
  
        <!-- Badge -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Badge Variants</h2>
        <div class="flex flex-wrap gap-4">
            <div class="inline-flex">
            <Badge variant="blue" size="sm">Small Blue</Badge>
            </div>
            <div class="inline-flex">
            <Badge variant="red" size="md">Medium Red</Badge>
            </div>
            <div class="inline-flex">
            <Badge variant="green" size="lg">Large Green</Badge>
            </div>
            <div class="inline-flex">
            <Badge variant="amber-subtle" size="md">Amber Subtle</Badge>
            </div>
        </div>
        </div>
  
        <!-- Button -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Button Variants</h2>
        <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-gray-700">Button Sizes</h3>
            <div class="inline-flex gap-4">
            <Button size="tiny">Button</Button>
            <Button size="small">Button</Button>
            <Button>Button</Button>
            <Button size="large">Button</Button>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Button Types</h3>
            <div class="inline-flex gap-4">
            <Button variant="secondary">Button</Button>
            <Button variant="outline">Button</Button>
            <Button variant="ghost">Button</Button>
            <Button variant="link">Button</Button>
            <Button variant="error">Button</Button>
            <Button variant="warning">Button</Button>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Button Shapes</h3>
            <div class="inline-flex gap-4">
            <Button aria-label="Upload" shape="square" size="tiny" variant="ghost">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="square" size="small">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="square" variant="outline">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="square" size="large">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="circle" size="tiny">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="circle" size="small">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="circle">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
        
            <Button aria-label="Upload" shape="circle" size="large">
                <div class="w-[16px] h-[16px]">
                    <ChevronDown/>
                </div>
            </Button>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Button Icons</h3>
            <div class="inline-flex gap-4">
            <Button prefix={ChevronDown}>upload</Button>
            <Button suffix={ChevronDown}>upload</Button>
            <Button prefix={ChevronDown} suffix={ChevronDown}>upload</Button>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Button Rounded</h3>
            <div class="inline-flex gap-4">
            <Button size="tiny" variant="secondary" rounded>upload</Button>
            <Button size="small" variant="secondary" rounded>upload</Button>
            <Button variant="secondary" rounded>upload</Button>
            <Button size="large" variant="secondary" rounded>upload</Button>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Button Disabled</h3>
            <div class="inline-flex gap-4">
            <Button size="tiny" disabled>upload</Button>
            <Button size="small" disabled>upload</Button>
            <Button disabled>upload</Button>
            <Button size="large" disabled>upload</Button>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Button Loading</h3>
            <div class="inline-flex gap-4">
            <Button size="tiny" loading>upload</Button>
            <Button size="small" loading>upload</Button>
            <Button loading>upload</Button>
            <Button size="large" loading>upload</Button>
            </div>
        </div>
        </div>

        <!-- Card -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">Card</h2>
            <div class="flex flex-col gap-4">
            <Card.Root class="w-[350px]">
                <Card.Header>
                    <h3 class="text-lg font-bold dark:text-white">Card Title</h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Card description goes here.</p>
                </Card.Header>
                <Card.Content>
                    <p class="text-neutral-950 dark:text-white">This is the main content of the card. Add your content here.</p>
                </Card.Content>
                <Card.Footer>
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
                </Card.Footer>
            </Card.Root>
            </div>
        </div>

        <!-- Checkbox -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">CheckBox</h2>
            <div class="flex flex-wrap gap-4">
    
            <div class="flex flex-col gap-4">
                <h3 class="text-lg font-semibold text-gray-700">Basic</h3>
                <Checkbox>option 1</Checkbox>
                <h3 class="text-lg font-semibold text-gray-700">Disable</h3>
                <Checkbox disabled>Disabled</Checkbox>
                <Checkbox checked disabled>Disabled Checked</Checkbox>
                <Checkbox disabled indeterminate>Disabled Indeterminate</Checkbox>
                <h3 class="text-lg font-semibold text-gray-700">Indeterminate</h3>
                <Checkbox indeterminate>option 1</Checkbox>
                <h3 class="text-lg font-semibold text-gray-700">Choose</h3>
                <Checkbox value="avatar" bind:items>avatar</Checkbox>
                <Checkbox value="button" bind:items>button</Checkbox>
                <Checkbox value="calendar" bind:items>calendar</Checkbox>
                <Checkbox value="choicebox" bind:items>choicebox</Checkbox>
            </div>
    
            </div>
        </div>

        <!-- Context Menu -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">Context Menu</h2>
            <div class="flex flex-wrap gap-4">
                <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <div class="h-32 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-md border-1 border-dashed border-neutral-300 flex items-center justify-center text-center">
                        Context Menu
                    </div>
                </ContextMenu.Trigger>
        
                <ContextMenu.Content class="w-[200px] bg-white dark:bg-neutral-800 shadow-sm rounded-md">
                    <ContextMenu.Item onClick={() => alert('Действие 1')}>Действие 1</ContextMenu.Item>
                    <ContextMenu.Item onClick={() => alert('Действие 2')}>Действие 2</ContextMenu.Item>
                    <ContextMenu.Item onClick={() => alert('Действие 3')}>Действие 3</ContextMenu.Item>
                </ContextMenu.Content>
                </ContextMenu.Root>
            </div>
        </div>
  
        <!-- Input -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Input basic</h2>
        <div class="flex flex-wrap gap-4">

            <div class="flex flex-col gap-4">
            <Input aria-labelledby="Demo input" placeholder="small" size="small" />
            <Input aria-labelledby="Demo input" placeholder="small" size="medium" />
            <Input aria-labelledby="Demo input" placeholder="small" size="large" />
            <h3 class="text-lg font-semibold text-gray-700">Input Error</h3>
            <Input aria-labelledby="Demo input" error="An error message." placeholder="litl@litl.io" size="small"/>
            <Input aria-labelledby="Demo input" error="An error message." placeholder="litl@litl.io" size="medium"/>
            <Input aria-labelledby="Demo input" error="An error message." placeholder="litl@litl.io" size="large"/>
            <h3 class="text-lg font-semibold text-gray-700">Input Search</h3>
            <SearchInput placeholder="Enter some text..." size="small"/>
            <SearchInput placeholder="Enter some text..." size="medium"/>
            <SearchInput placeholder="Enter some text..." size="large"/>
            </div>

        </div>
        </div>

        <!-- Menu -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Menu</h2>
        <div class="flex flex-wrap gap-4">

            <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-gray-700">Basic</h3>
            <Menu.Root>
                <Menu.Button>Actions</Menu.Button>
                <Menu.Content class="w-[200px]">
                    <Menu.Item onClick={() => console.log('One')}>One</Menu.Item>
                    <Menu.Item onClick={() => console.log('Two')}>Two</Menu.Item>
                    <Menu.Item onClick={() => console.log('Three')}>One</Menu.Item>
                    <Menu.Item onClick={() => console.log('Delete')} type="error">Delete</Menu.Item>
                </Menu.Content>
            </Menu.Root>
            <h3 class="text-lg font-semibold text-gray-700">Link</h3>
            <Menu.Root>
                <Menu.Button>Actions</Menu.Button>
                <Menu.Content class="w-[200px]">
                    <Menu.Link href="/menu">One</Menu.Link>
                    <Menu.Link href="#/">Two</Menu.Link>
                    <Menu.Link href="#/">One</Menu.Link>
                </Menu.Content>
            </Menu.Root>
            <h3 class="text-lg font-semibold text-gray-700">Icons</h3>
            <Menu.Root>
                <Menu.Button aria-label="Menu" shape="square" size="small" type="outline">
                    <div class="w-[16px] h-[16px]">
                        <ElipsisHorisontal size={16} />
                    </div>
                </Menu.Button>
                <Menu.Content class="w-[200px]">
                    <Menu.Item prefix={ChevronRight}>Left</Menu.Item>
                    <Menu.Item prefix={ChevronRight}>Center</Menu.Item>
                    <Menu.Item prefix={ChevronRight}>Right</Menu.Item>
                </Menu.Content>
            </Menu.Root>
            <Menu.Root>
                <Menu.Button aria-label="Menu" shape="square" size="small" type="ghost">
                    <div class="w-[16px] h-[16px]">
                        <ElipsisHorisontal size={16} />
                    </div>
                </Menu.Button>
                <Menu.Content class="w-[200px]">
                    <Menu.Item suffix={ChevronRight}>Left</Menu.Item>
                    <Menu.Item suffix={ChevronRight}>Center</Menu.Item>
                    <Menu.Item suffix={ChevronRight}>Right</Menu.Item>
                </Menu.Content>
            </Menu.Root>
            </div>

        </div>
        </div>

        <!-- Modal -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Modal</h2>
        <div class="flex flex-col gap-4">
            <div>
            <Button onclick={() => (active = true)} size="small">Open Modal</Button>
                <Modal.Root bind:active>
                <Modal.Content>
                    <Modal.Body>
                    <Modal.Header>
                        <Modal.Title>Create</Modal.Title>
                        <Modal.Subtitle>
                        Enter a unique name for your token.
                        </Modal.Subtitle>
                    </Modal.Header>
                    <Modal.Text>Some content contained within the modal.</Modal.Text>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onclick={() => (active = false)} variant="secondary">Cancel</Button>
                    <Button onclick={() => (active = false)}>Submit</Button>
                    </Modal.Footer>
                </Modal.Content>
                </Modal.Root>
            </div>

        </div>
        </div>

        <!-- Progress -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Progress</h2>
        <div class="flex flex-col gap-4">
            <Progress value={80} />

            <Progress value={dynamic} />

            <div class="flex items-center gap-4">
            <Button
                onclick={() => {
                if (dynamic < 100) {
                    dynamic = dynamic + 10;
                }
                }}
                size="small">Increase</Button>
            <Button
                onclick={() => {
                if (dynamic > 0) {
                    dynamic = dynamic - 10;
                }
                }}
                size="small"
                variant="secondary">Decrease</Button>
            </div>

            <div class="w-full space-y-6">
            <Progress type="success" value={100} />
            <Progress type="error" value={10} />
            <Progress type="warning" value={40} />
            <Progress type="secondary" value={70} />
            </div>

        </div>
        </div>

        <!-- Scroll Area-->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">Scroll Area</h2>
            <div class="flex flex-col gap-6">
            <!-- Вертикальный скролл -->
            <ScrollArea.Root height="300px" width="240px">
                <ScrollArea.Viewport>
                    <ScrollArea.Content>
                        <ul class="space-y-2 p-2">
                            {#each blocks as block}
                                <li class="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                                    {block}
                                </li>
                            {/each}
                        </ul>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
            </ScrollArea.Root>
            
            
        </div>
        </div>

        <!-- Select -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">Select</h2>
            <div class="flex flex-wrap gap-4">
            <div class="flex flex-col gap-4">
                <div class="grid grid-cols-1 gap-4">
                <Select.Root size="small" bind:value class="w-full lg:w-auto">
                    <Select.Trigger class="w-full lg:w-[200px]">
                        <Select.Value placeholder="select a friuit" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="apple">apple</Select.Item>
                        <Select.Item value="banana">banana</Select.Item>
                        <Select.Item value="orange">orange</Select.Item>
                        <Select.Item value="pineapple">pineapple</Select.Item>
                    </Select.Content>
                </Select.Root>
            
                <Select.Root bind:value class="w-full lg:w-auto" >
                    <Select.Trigger class="w-full lg:w-[200px]">
                        <Select.Value placeholder="select a friuit" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="apple">apple</Select.Item>
                        <Select.Item value="banana">banana</Select.Item>
                        <Select.Item value="orange">orange</Select.Item>
                        <Select.Item value="pineapple">pineapple</Select.Item>
                    </Select.Content>
                </Select.Root>
            
                <Select.Root size="large" bind:value class="w-full lg:w-auto" >
                    <Select.Trigger class="w-full lg:w-[200px]">
                        <Select.Value placeholder="select a friuit" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="apple">apple</Select.Item>
                        <Select.Item value="banana">banana</Select.Item>
                        <Select.Item value="orange">orange</Select.Item>
                        <Select.Item value="pineapple">pineapple</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>
            </div>
        </div>
    
        </div>

        <!-- Separator -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
            <h2 class="text-lg font-semibold text-gray-700">Separator</h2>
            <div class="flex flex-col gap-4">
            <Separator margin="md" label="Your content your way"/>
    
            <Card.Root class="w-[350px]">
                <Card.Header>
                    <h3 class="text-lg font-bold">Card Title</h3>
                    <p class="text-sm text-neutral-600">Card description goes here.</p>
                </Card.Header>
                <Separator margin="xl"/>
                <Card.Content>
                    <p>This is the main content of the card. Add your content here.</p>
                </Card.Content>
                <Separator margin="xl"/>
                <Card.Footer>
                    <Button variant="ghost">Cancel</Button>
                    <Button>Submit</Button>
                </Card.Footer>
            </Card.Root>
            </div>
        </div>

        <!-- Tabs-->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Tabs</h2>
        <div class="flex flex-col gap-4">
            <Tabs
            bind:selected
            tabs={[
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango' }
            ]}
            />
        </div>

        <h3 class="text-lg font-semibold text-gray-700">Disabled</h3>
        <div class="flex flex-col gap-4">
            <Tabs
            disabled
            bind:selected
            tabs={[
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango' }
            ]}
            />
        </div>

        <h3 class="text-lg font-semibold text-gray-700">Disabled vs tooltip</h3>
        <div class="flex flex-col gap-4">
            <Tabs
            bind:selected
            tabs={[
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango' ,disabled: true, tooltip: 'Mangos are not allowed'}
            ]}
            />
        </div>

        <h3 class="text-lg font-semibold text-gray-700">Secondary</h3>
        <div class="flex flex-col gap-4">
            <Tabs
            bind:selected
            tabs={[
                { title: 'Apple', value: 'apple'},
                { title: 'Microsoft', value: 'microsoft'},
                { title: 'Samsung', value: 'samsung'}
            ]}
                type="secondary"
            />
        </div>

        </div>
    
        <!-- TextArea -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">TextArea</h2>
        <div class="flex flex-wrap gap-4">

            <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-gray-700">Basic</h3>
            <TextArea placeholder="Some input"/>
            <h3 class="text-lg font-semibold text-gray-700">No resize</h3>
            <TextArea resize={false} placeholder="Some input"/>
            <h3 class="text-lg font-semibold text-gray-700">Disabled</h3>
            <TextArea disabled placeholder="Some input"/>
            <h3 class="text-lg font-semibold text-gray-700">Readonly</h3>
            <TextArea readonly value="Some input"/>
            <h3 class="text-lg font-semibold text-gray-700">Full width</h3>
            <TextArea width="100%" placeholder="Some input"/>
            <h3 class="text-lg font-semibold text-gray-700">Auto resize</h3>
            <TextArea placeholder="Some input" resize autoResize />
            <TextArea placeholder="Some input" resize={false} autoResize width="195px" className="min-h-[58px]" />
            </div>

        </div>
        </div>
    
        <!-- Toggle -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Toggle</h2>
        <div class="flex flex-wrap gap-4">
            <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-gray-700">Basic</h3>
            <Toggle/>
            <h3 class="text-lg font-semibold text-gray-700">Disabled</h3>
            <Toggle disabled/>
            <h3 class="text-lg font-semibold text-gray-700">Disabled Checked</h3>
            <Toggle disabled checked={true}/>
            <h3 class="text-lg font-semibold text-gray-700">Checked</h3>
            <Toggle checked={true}/>
            <h3 class="text-lg font-semibold text-gray-700">Colors</h3>
            <Toggle color="secondary" checked={true}/>
            <Toggle color="warning" checked={true}/>
            <Toggle color="error" checked={true}/>
            <Toggle color="success" checked={true}/>
            </div>
        </div>
        </div>

        <!-- Tooltip -->
        <div class="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-700">Tooltip</h2>
        <div class="flex flex-col gap-4">
            
            <div class="w-full flex flex-wrap gap-4 justify-between">

                <Tooltip text="The Evil Rabbit Jumped over the Fence" position="top">
                <span class="dark:text-white">Top</span>
                </Tooltip>


                <Tooltip text="The Evil Rabbit Jumped over the Fence" position="bottom">
                <span class="dark:text-white">Bottom</span>
                </Tooltip>

                <Tooltip text="The Evil Rabbit Jumped over the Fence" position="right">
                <span class="dark:text-white">Right</span>
                </Tooltip>


                <Tooltip text="The Evil Rabbit Jumped over the Fence" position="left">
                <span class="dark:text-white">Left</span>
                </Tooltip>
            </div>

            <div class="w-full flex flex-wrap gap-4 justify-between">
            <Tooltip text="The Evil Rabbit" position="top" type="success">
                <span class="dark:text-white">Top</span>
            </Tooltip>

            <Tooltip text="The Evil Rabbit" position="bottom" type="error">
                <span class="dark:text-white">Bottom</span>
            </Tooltip>

            <Tooltip text="The Evil Rabbit" position="right" type="warning">
                <span class="dark:text-white">Right</span>
            </Tooltip>

            <Tooltip text="The Evil Rabbit" position="left" type="violet">
                <span class="dark:text-white">Left</span>
            </Tooltip>
            </div>

            <div class="w-full flex flex-wrap gap-4 justify-between">

            <Tooltip position="bottom" text="The Evil Rabbit Jumped over the Fence">
                <Button size="small">Bottom</Button>
            </Tooltip>

            <Tooltip position="left" text="The Evil Rabbit Jumped over the Fence">
                <Badge size="sm">LEFT</Badge>
            </Tooltip>

            </div>

        </div>
        </div>
  
    </div>
  </main>