import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../api/products';
import UseLocalStorage from '../../hooks/UseLocalStorage';

import { Product } from '../../types/Product';
import { CardItem } from '../../types/Cart';
import { ProductDetailsFragment } from '../../generated/graphql';

type ContextProps = {
  products: any[];
  productsList: (type: string, sort: string, query: string) => Product[];
  favProducts: Product[];
  setFavProducts: React.Dispatch<React.SetStateAction<Product[] | []>>;
  cart: CardItem[];
  setCart: React.Dispatch<React.SetStateAction<CardItem[] | []>>;
};

export const ProductsContext = React.createContext<ContextProps>({
  products: [],
  productsList: () => [],
  favProducts: [],
  setFavProducts: () => {},
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductDetailsFragment[] | []>([]);

  const [favProducts, setFavProducts] = UseLocalStorage<
    ProductDetailsFragment[]
  >('favProducts', []);

  const [cart, setCart] = UseLocalStorage<CardItem[]>('cart', []);

  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res);
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const sortProducts = (productsToSort: Product[], sort: string): Product[] => {
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
  };

  const filterProducts = (
    productsToFilter: Product[],
    query: string
  ): Product[] => {
    return productsToFilter.filter((product) => {
      return product.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  };

  const productsList = (type: string, sort: string, query: string) => {
    const productsWithPrice = []
      .filter((product) => product.type === type)
      .map((product: Product) => ({
        ...product,
        newPrice: product.discount
          ? (
              product.price -
              (product.discount * product.price) / 100
            ).toString()
          : null,
      }));

    const sortedProducts = sortProducts(productsWithPrice, sort);

    return filterProducts(sortedProducts, query);
  };

  const contextValue: any = useMemo(() => {
    return {
      products,
      productsList,
      favProducts,
      setFavProducts,
      cart,
      setCart,
    };
  }, [products, favProducts, cart]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
