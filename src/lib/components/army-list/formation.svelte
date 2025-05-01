<script>
  import aggregators from '$lib/aggregators.svelte.js';
  import armyList from '$lib/army-list.svelte.js';
  import force from '$lib/force.svelte.js';
  import validations from '$lib/validations.svelte.js';

  let
    { name } = $props(),
    { cost,
	  validations: formationValidations } = armyList.formation(name),
    aggregator = aggregators.forFormation(name),
	invalid = $derived(!validations.forFormation(name).every(({ valid }) => valid));
</script>

<div class="formation" class:-invalid={invalid}>
  <button class="add" onclick={() => force.addFormation(name)} type="button">+</button>
  <span class="name">{name} [{aggregator.count}] ({aggregator.points})</span>
  <span class="cost">{cost}</span>
</div>

<style lang="scss">
  .formation {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
	
	&.-invalid {
	  background: red;
	}
  }
</style>
