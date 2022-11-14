import { ProductOverviewDTO } from '../../../../common/dtos/product-dtos';
import { ProductFilterOptions } from '../../../../common/types/state/filter-options';

const getFilterOptions = ({ products = [] }: { products: Array<ProductOverviewDTO> }): ProductFilterOptions => {
  const brandsList: Array<string> = [];
  const sizesList:  Array<string> = [];

  products.forEach(({ brand, variants }) => {

    if (!brandsList.includes(brand)) brandsList.push(brand);

    variants.forEach(({ size }) => {
      if (!sizesList.includes(size)) sizesList.push(size);
    });

  });

  return {
    brand: brandsList.sort((a, b) => a.localeCompare(b)),
    size:  sizesList.sort((a, b) => Number(a) - Number(b)),
    price: [0, 1500],
    ratingAverage: [1, 2, 3, 4, 5]
  };
};

export { getFilterOptions };