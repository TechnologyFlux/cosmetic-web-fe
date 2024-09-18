export function formatCurrency(num, to = 0, currency = "USD") {
  let newNum = Number.parseFloat(num).toFixed(2);
  switch (currency) {
    case "USD":
      return `$${Number(newNum).toLocaleString('en-US')}`;
    default:
      return `${Number(newNum).toLocaleString('vi-VN')} VND`;
  }
}

export function formatSingleNumber(n) {
  return n > 9 ? "" + n : "0" + n;
}

export function convertToSlug(title, id) {
  const renderId = id ? "-" + id : "";
  return title ? title.replace(/ /g, "-").toLowerCase() + renderId : "";
}

export function renderContainer(type) {
  switch (type) {
    case "wide":
      return "container-full-half";
    case "full":
      return "container-full";
    default:
      return "container";
  }
}
