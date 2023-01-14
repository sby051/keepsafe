<script lang="ts">
    import { Icon } from "@components";
    
    export let value = "";
</script>

<div class="search-input">
    <Icon name="search" opacity={0.7} size="m"/>
    <input bind:value placeholder="Search" type="text"/>
</div>

<style>
    .search-input {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        border-radius: var(--br-more);
        background-color: var(--clr-black-3);
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        gap: 0.5rem;
        width: 100%;
    }
    
    .search-input:focus, .search-input:hover {
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
        background-color: var(--clr-grey-1);
    }
    
    .search-input input {
        border: none;
        background-color: transparent;
        width: 100%;
        outline: none;
        margin-left: 0.5rem;
        color: white;
    }
</style>