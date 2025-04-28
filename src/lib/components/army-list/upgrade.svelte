<script>
  import armyList from '$lib/army-list.svelte.js';

  let
    { name,
      addUpgrade } = $props(),
    { costString } = armyList.upgrade(name);
</script>

<div class="upgrade">
  <button class="add" onclick={addUpgrade} type="button">+</button>
  <span class="name">{name} [] ()</span>
  <span class="cost">({costString})</span>
</div>

<style lang="scss">
  .upgrade {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
