import { Module } from '@nestjs/common';

import { ProductsResolver } from './resolvers/products.resolver';
import { ProductsService } from './products.service';

@Module({
    providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
