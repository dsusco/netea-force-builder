<script>
  import force from '$lib/force.svelte.js';

  let { id,
        name } = $props();
</script>

<div class="formation">
  <button class="remove" onclick={() => force.removeFormation(id)} type="button">-</button>
  <span class="name">{name}</span>
</div>

<style lang="scss">
  .formation {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
