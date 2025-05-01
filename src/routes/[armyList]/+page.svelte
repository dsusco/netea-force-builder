<script>
  import armyList from '$lib/army-list.svelte.js';
  import force from '$lib/force.svelte.js';
  import FormationType from '$lib/components/army-list/formation-type.svelte';
  import Formation from '$lib/components/force/formation.svelte';
</script>

<div class="force-builder">
  <div>
    <div class="title">
      <span class="name">{armyList.name} Army List</span>
    </div>

    {#each armyList.formationTypes as name}
      <FormationType {name} />
    {/each}
  </div>

  <div>
    <div class="title">
      <span class="name">Force [{force.formationCount}] ({force.points})</span>
    </div>

    {#each force.formations as formation}
      <Formation {...formation} />
    {/each}
  </div>
</div>

<style lang="scss">
  .force-builder {
    display: flex;

    > div {
      flex: 1 1 50%;
      padding: 1em;

      &:first-child {
        border-right: 1px solid;
      }
    }
  }

  .title {
    display: flex;
    font-weight: bold;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
