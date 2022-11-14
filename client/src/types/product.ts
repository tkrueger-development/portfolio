import { BaseEntity } from './base-entity';

class ProductVariant {
  price:    number;
  quantity: number;
  views:    number;
  sales:    number;
  image:    string;
  color?:   string | null;
  size?:    string | null;

  constructor({ price, quantity, views, sales, image, color, size }: {
    price:    number;
    quantity: number;
    views:    number;
    sales:    number;
    image:    string;
    color?:   string | null;
    size?:    string | null;
  }) {

    this.price    = price;
    this.quantity = quantity;
    this.views    = views;
    this.sales    = sales;
    this.image    = image;
    this.color    = color || null;
    this.size     = size  || null;
  }
}

class Product extends BaseEntity {
  brand:         string;
  name:          string;
  category:      string;
  imagePath:     string;
  imageGallery:  Array<string>;
  ratingNum:     number;
  ratingAverage: number;
  description:   string;
  tags:          Array<string>;
  variants:      Array<ProductVariant>;

  productSizes:  Array<string> = [];
  productColors: Array<string> = [];

  constructor(
    { id, createdOn, modifiedOn, brand, name, category, imagePath, imageGallery, ratingNum, ratingAverage, description, tags, variants }: {
      id:            string;
      createdOn:     number;
      modifiedOn:    number;
      brand:         string;
      name:          string;
      category:      string;
      imagePath:     string;
      imageGallery:  Array<string>;
      ratingNum:     number;
      ratingAverage: number;
      description:   string;
      tags:          Array<string>;
      variants:      Array<ProductVariant>;
    }) {

    super({ id, createdOn, modifiedOn });

    this.brand         = brand;
    this.name          = name; 
    this.category      = category;
    this.imagePath     = imagePath;
    this.imageGallery  = imageGallery;
    this.ratingNum     = ratingNum;
    this.ratingAverage = ratingAverage;
    this.description   = description;
    this.tags          = tags;
    this.variants      = variants;

    this.variants.forEach(({ size, color }) => {
      if (size && !this.productSizes.includes(size)) this.productSizes.push(size);
      if (color && !this.productColors.includes(color)) this.productColors.push(color);
    });
  }

  public hasMultiplePhotos():   boolean { return this.imageGallery.length > 1; }
  public hasMultipleVariants(): boolean { return this.variants.length > 1; }
  public hasMultipleColors():   boolean { return this.productColors.length > 1; }
  public hasMultipleSizes():    boolean { return this.productSizes.length > 1; }

  public getVariantByConfig({ color, size }: { color?: string, size?: string }): ProductVariant {

    const [filtered] = this.variants.filter((variant) => {
      let passResult = true;

      if (size)  passResult = passResult && size  === variant.size;
      if (color) passResult = passResult && color === variant.color;

      
      return passResult;
    });

    return filtered;
  }

  public getSizes(): Array<string> | null {
    if (this.productSizes.length === 0) return null; 

    return this.productSizes;
  }

  public getColors(): Array<string> | null {
    if (this.productColors.length === 0) return null; 

    return this.productColors;
  }

}

export { Product, ProductVariant };