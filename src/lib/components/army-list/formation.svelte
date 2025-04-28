<script>
  import armyList from '$lib/army-list.svelte.js';
  import force from '$lib/force.svelte.js';

  let
    { name } = $props(),
    { cost } = armyList.formation(name);
</script>

<div class="formation">
  <button class="add" onclick={() => force.addFormation(name)} type="button">+</button>
  <span class="name">{name}</span>
  <span class="cost">{cost}</span>
</div>

<style lang="scss">
  .formation {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
