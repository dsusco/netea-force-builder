<script>
  import armyList from '$lib/army-list.svelte.js';
</script>

<div class="force-builder">
  <div>
    <div class="title">
      <span class="name">{armyList.name} Army List</span>
    </div>
  </div>

  <div>
    <div class="title">
      <span class="name">Force</span>
    </div>
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
