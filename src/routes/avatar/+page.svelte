<script lang="ts">
    import Avatar from "$lib/avatar/avatar.svelte";
    import User from 'lucide-svelte/icons/user';

    let cards = [
        { id: 1, name: "Joe Middle", img: "https://randomuser.me/api/portraits/women/68.jpg", state: "Image" },
        { id: 2, name: "Kate", state: "Name", detail: true },
        { id: 3, name: "Emma Watson", state: "Full Name", detail: true },
        { 
            id: 4, 
            name: "Emma Watson", 
            icon: { component: User, props: { size: 16, class: "text-black dark:text-white" } }, 
            state: "Icon" 
        },
        { id: 5, name: "Emma Watson", details: "Product Manager", state: "Details", detail: true },
        { id: 6, name: "Anna Wirts", img: "https://randomuser.me/api/portraits/women/47.jpg", details: "Frontend Developer", detail: true,  state: "Image & Details" },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Avatar</h1>
        <p class="text-foreground dark:text-foreground">A growing collection of over 51 avatar components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center">
                    <Avatar 
                        name={card.name} 
                        img={card.img} 
                        icon={card.icon} 
                        details={card.details} 
                        detail={card.detail} 
                    />
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>    
</div>