<script>
  import aggregators from '$lib/aggregators.svelte.js';
  import armyList from '$lib/army-list.svelte.js';
  import validations from '$lib/validations.svelte.js';
  import Formation from '$lib/components/army-list/formation.svelte';

  let
    { name } = $props(),
    { formations } = armyList.formationType(name),
    aggregator = aggregators.forFormationType(name),
	invalid = $derived(!validations.forFormationType(name).every(({ valid }) => valid));
</script>

<div class="formation-type">
  <div class="title" class:-invalid={invalid}>
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
	
	&.-invalid {
	  background: red;
	}
  }
</style>
