<script>
  import armyList from '$lib/army-list.svelte.js';
  import aggregators from '$lib/aggregators.svelte.js';
  import Formation from '$lib/components/army-list/formation.svelte';

  let
    { name } = $props(),
    { formations,
      type } = armyList.formationType(name),
    aggregator = aggregators.forFormationType(name);
</script>

<div class="formation-type">
  <div class="title">
    <span class="name">{name} Formations [{aggregator.count}] ({aggregator.points})</span>
  </div>

  {#each formations as name}
    <Formation {name} />
  {/each}
</div>

<style lang="scss">
  .title {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
