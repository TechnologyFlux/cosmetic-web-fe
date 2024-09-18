//get product
export const getProducts = (products, category, type, limit) => {
  category = category?.categoryName && category?.categoryName?.toLowerCase() === "all" ? "" : category?.categoryName;
  const finalProducts = category
    ? products?.filter(
        (product) => product?.categoryName?.toLowerCase() === category.toLowerCase()
      )
    : products;
  if (type && type === "new") {
    const newProducts = finalProducts.filter((product) => product.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  } else {
    return (
      finalProducts &&
      finalProducts.slice(0, limit ? limit : finalProducts.length)
    );
  }
};

//get product by slug
export const getProductBySlug = (products, slug) => {
  return slug
    ? products.find(
        (product) => product.slug.toLowerCase() === slug.toLowerCase()
      )
    : null;
};

//sort product
export const getProductBySort = (products, type, limit) => {
  function sortWithCondition(arr, value, reverse = false) {
    let num = reverse ? -1 : 1;
    return products.slice(0, limit ? limit : products.length).sort((a, b) => {
      if (a[value] < b[value]) {
        return -1 * num;
      }
      if (a[value] > b[value]) {
        return 1 * num;
      }
      return 0;
    });
  }
  if (!type || type === "default") {
    return products;
  } else if (type === "az") {
    return sortWithCondition(products, "title");
  } else if (type === "za") {
    return sortWithCondition(products, "title", true);
  } else if (type === "lowToHigh") {
    return sortWithCondition(products, "currentCost");
  } else if (type === "highToLow") {
    return sortWithCondition(products, "currentCost", true);
  } else {
    return products?.slice(0, limit ? limit : products.length);
  }
};

//get product by price
export const getProductByPrice = (products, from, to, limit) => {
  if (from && !to) {
    return products.filter((p) => p.currentCost > from);
  } else if (!from && to) {
    return products.filter((p) => p.currentCost < to);
  } else if (!from && !to) {
    return products;
  } else {
    return products.filter((p) => p.currentCost > from && p.currentCost < to);
  }
};

//get product by brand
export const getProductByBrand = (products, brand) => {
  return brand
    ? products.filter((p) => p?.brandName?.toLowerCase() === brand?.name?.toLowerCase())
    : products;
};

//get product by filter
export const getProductbyFilter = (
  products,
  sortType,
  category,
  from,
  to,
  brand,
  limit
) => {
  let sortedProduct;
  if (category) {
    let productCategory = getProducts(products, category);
    if (to && !brand) {
      let productPrice = getProductByPrice(productCategory, from, to);
      sortedProduct = getProductBySort(productPrice, sortType);
    } else if (!to && brand) {
      let productBrand = getProductByBrand(productCategory, brand);
      sortedProduct = getProductBySort(productBrand, sortType);
    } else if (to && brand) {
      let productBrand = getProductByBrand(productCategory, brand);
      let productPrice = getProductByPrice(productCategory, from, to);
      let commonProducts = productBrand.filter((o1) =>
        productPrice.some((o2) => o1.id === o2.id)
      );
      sortedProduct = getProductBySort(commonProducts, sortType);
    } else {
      sortedProduct = getProductBySort(productCategory, sortType);
    }
  } else {
    sortedProduct = getProductBySort(products, sortType);
  }
  return sortedProduct?.slice(0, limit || products.length);
};
