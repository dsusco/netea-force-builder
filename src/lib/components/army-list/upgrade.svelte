<script>
  import armyList from '$lib/army-list.svelte.js';
  import force from '$lib/force.svelte.js';

  let
    { name,
      aggregator,
      addUpgrade } = $props(),
    { costString } = armyList.upgrade(name),
    forceAggregator = force.upgradeAggregators[name];
</script>

<div class="upgrade">
  <button class="add" onclick={addUpgrade} type="button">+</button>
  <span class="name">{name} [{aggregator.count}] ({aggregator.points}) [{forceAggregator.count}] ({forceAggregator.points})</span>
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
