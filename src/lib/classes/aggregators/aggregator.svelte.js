class Aggregator {
  subjects = $derived([]);

  count = $derived(this.subjects.length);

  points = $derived(this.subjects.reduce((pointTotal, { points }) => pointTotal += points, 0));
}

export default Aggregator;
