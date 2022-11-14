import z from 'zod';
import { randomInt, randomRating } from '../random-value';
import { MongoSeeder } from '../mongo-seeder';
import { productData } from './product-data';
import { config } from '../../../common/config/config';

const seedProductSchema = z.object({
  createdOn:        z.number().default(() => Date.now() + randomInt({ min: 1_000, max: 1_000_000 })),
  modifiedOn:       z.number().default(() => Date.now() + randomInt({ min: 1_000, max: 1_000_000 }) + randomInt({ min: 1_000_000, max: 2_000_000 })),
  brand:            z.string().min(1).max(32),
  name:             z.string().min(3).max(32),
  category:         z.string().min(3).max(32),

  imagePath:        z.string().regex(/^[a-zA-Z]{2,}\/$/),

  imageGallery:     z.array(
                             z.string()
                              .regex(/^(\w|-){3,}\.(png|jpg|jpeg)$/)
                            ).nonempty(),

  description:      z.string().min(3),
  tags:             z.array(z.string()).nonempty(),
  ratingNum:        z.number().nonnegative().default(() => randomInt({ min: 25, max: 100 })),
  ratingAverage:    z.number().nonnegative().default(() => randomRating({ min: 3, max: 5 })),

  variants:         z.array(z.object({
    price:                    z.number().nonnegative(),
    quantity:                 z.number().nonnegative(),
    image:                    z.string().regex(/^(\w|-){1,}\.(png|jpg|jpeg)$/),
    size:                     z.string().optional(),
    color:                    z.string().optional(),
    views:                    z.number().default(0),
    sales:                    z.number().default(0),
                            }))
});


const exec = async () => {
  const dbName           = 'windandwave';
  const collectionName   = 'products';
  const mongoURI         = config.mongodb.mongoURI;

  const mongoSeeder = await MongoSeeder.create({ mongoURI, dbName });

  // wipe
  if (await mongoSeeder.wipe({ collectionName })) console.log('Products wiped successfully!');

  // validate
  const products = productData.map((rawData) => {
    return seedProductSchema.parse(rawData);
  });

  // seed
  await mongoSeeder.seed({ collectionName, inputData: products });
  console.log('Products injected successfully!');

  await mongoSeeder.disconnect();
  process.exit(0);
};

exec();