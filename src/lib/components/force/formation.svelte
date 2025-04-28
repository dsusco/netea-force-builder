<script>
  import force from '$lib/force.svelte.js';
  import Upgrade from '$lib/components/army-list/upgrade.svelte';
  import FormationUpgrade from '$lib/components/force/upgrade.svelte';

  let { id,
        name,
        allowedUpgrades,
        upgrades,
        points,
        upgradeAggregators,
        addUpgrade,
        removeUpgrade } = $props();
</script>

<div class="formation">
  <div class="title">
    <button class="remove" onclick={() => force.removeFormation(id)} type="button">-</button>
    <span class="name">{name}</span>
    <span class="points">{points}</span>
  </div>

  <div class="upgrades">
    {#each upgrades as upgrade}
      <FormationUpgrade {...upgrade} removeUpgrade={() => removeUpgrade(upgrade.id)} />
    {/each}
  </div>

  <div class="allowed-upgrades">
    {#each allowedUpgrades as name}
      <Upgrade {name} aggregator={upgradeAggregators[name]} addUpgrade={() => addUpgrade(name)} />
    {/each}
  </div>
</div>

<style lang="scss">
  .title {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
