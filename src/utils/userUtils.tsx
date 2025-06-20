export const getDecimalPart = (regular_price: any, sale_price: any) => {
  const actual: any = (((regular_price - sale_price) / regular_price) * 100)
    .toString()
    .split('.');

  return actual?.[1]?.[1]
    ? `${actual?.[0]}.${actual?.[1]?.[1]}`
    : `${actual?.[0]}`;
};
