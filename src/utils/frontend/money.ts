export const formatMoney = (value: number | string) => {
  const money = value.toString().replace(/[^\d.]/g, "");
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const sanitizeMoney = (value: string) => {
  return Number(value.replace(/,/g, ""));
};
