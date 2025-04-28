export function costToNumber (cost) {
  switch (cost.constructor.name) {
    case 'Array':
      return +cost[0];
    case 'Object':
      return +Object.values(cost)[0];
    default:
      return +cost;
  };
};

export function costToString (cost) {
  switch (cost.constructor.name) {
    case 'Array':
      return `${cost.join(', ')}`;
    case 'Object':
      return `${[...new Set(Object.values(cost))].join(', ')}`;
    default:
      return `${cost}`;
  };
};
