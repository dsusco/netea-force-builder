<script>
  let { name,
        costString,
        removeUpgrade } = $props();
</script>

<div class="upgrade">
  <button class="remove" onclick={removeUpgrade} type="button">-</button>
  <span class="name">{name}</span>
  <span class="points">({costString})</span>
</div>

<style lang="scss">
  .upgrade {
    display: flex;

    > .name {
      flex: 1 1 auto;
    }
  }
</style>
