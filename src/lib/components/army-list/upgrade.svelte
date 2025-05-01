<script>
  import aggregators from '$lib/aggregators.svelte.js';
  import armyList from '$lib/army-list.svelte.js';
  import validations from '$lib/validations.svelte.js';

  let
    { name,
      formationUpgradeAggregator,
      addUpgrade } = $props(),
    { costString } = armyList.upgrade(name),
    aggregator = aggregators.forUpgrade(name),
	invalid = $derived(!validations.forUpgrade(name).every(({ valid }) => valid));
</script>

<div class="upgrade" class:-invalid={invalid}>
  <button class="add" onclick={addUpgrade} type="button">+</button>
  <span class="name">{name} [{formationUpgradeAggregator.count}] ({formationUpgradeAggregator.points}) [{aggregator.count}] ({aggregator.points})</span>
  <span class="cost">({costString})</span>
</div>

<style lang="scss">
  .upgrade {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
	
	&.-invalid {
	  background: red;
	}
  }
</style>
