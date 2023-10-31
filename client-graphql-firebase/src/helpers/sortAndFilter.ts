import { ProductDetailsFragment } from '../generated/graphql';

function sortProducts(
  productsToSort: ProductDetailsFragment[],
  sort: string
): ProductDetailsFragment[] {
  return productsToSort.sort((product1, product2) => {
    switch (sort) {
      case 'newest':
        return +product2.age - +product1.age;

      case 'priceDown':
        return product2.price - product1.price;

      case 'priceUp':
        return product1.price - product2.price;

      case 'discount':
        return product2.discount - product1.discount;

      default:
        return 0;
    }
  });
}

function filterProducts(
  productsToFilter: ProductDetailsFragment[],
  query: string
): ProductDetailsFragment[] {
  return productsToFilter.filter((product) => {
    return product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });
}

export default function productsList(
  products: ProductDetailsFragment[],
  type: string,
  sort: string,
  query: string
) {
  const productsWithPrice = [...products]
    .filter((product) => product.type === type)
    .map((product) => ({
      ...product,
      newPrice: product.discount
        ? (product.price - (product.discount * product.price) / 100).toString()
        : null,
    }));

  const sortedProducts = sortProducts(productsWithPrice, sort);

  return filterProducts(sortedProducts, query);
}
