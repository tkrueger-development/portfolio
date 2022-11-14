import z from 'zod';

const productVariantSchema = z.object({
  price:         z.number().positive(),
  quantity:      z.number().nonnegative(),
  views:         z.number().default(0),
  sales:         z.number().default(0),
  image:         z.string().regex(/^(\w|-){1,}\.(png|jpg|jpeg)$/),
  color:         z.string().optional().refine((color) => color ? color : null),
  size:          z.string().optional().refine((size) => size ? size : null),
});

const productSchema = z.object({
  id:            z.string().optional(),
  brand:         z.string().min(1).max(32),
  name:          z.string().min(3).max(32),
  category:      z.string().min(3).max(32),
  imagePath:     z.string().regex(/^[a-zA-Z]{2,}\/$/),
  imageGallery:  z.array(z.string().regex(/^(\w|-){3,}\.(png|jpg|jpeg)$/)).nonempty(),
  description:   z.string().min(3),
  tags:          z.array(z.string()).nonempty(),
  ratingNum:     z.number().nonnegative().default(0),
  ratingAverage: z.number().nonnegative().default(0)

}).extend({ variants: z.array(productVariantSchema) });

const productFilterSchema = z.object({
  brand:         z.array(z.string()).nonempty().optional(),
  size:          z.array(z.string()).nonempty().optional(),
  price:         z.array(z.number()).nonempty().optional(),
  ratingAverage: z.number().optional()
});

export { productSchema, productVariantSchema, productFilterSchema };