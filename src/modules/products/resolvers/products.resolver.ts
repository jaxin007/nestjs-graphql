import { Inject, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductsService } from '../products.service';
import { ProductsEntity } from '../entity/products.entity';
import { GetProductsListDto } from '../dto/getProductsList.dto';
import { CreateProductDto } from '../dto/createProduct.dto';
import { RemoveProductDto } from '../dto/removeProduct.dto';

@Resolver()
export class ProductsResolver {
    @Inject() private readonly productsService: ProductsService;

    @Query(() => [ProductsEntity])
    getProducts(
        @Args('filter', { type: () => GetProductsListDto }, ValidationPipe) filter: GetProductsListDto,
    ): ProductsEntity[] {
        return this.productsService.getProducts(filter);
    }

    @Mutation(() => ProductsEntity)
    createProduct(
        @Args('input', { type: () => CreateProductDto }, ValidationPipe) input: CreateProductDto,
    ): ProductsEntity {
        return this.productsService.createProduct(input);
    }

    @Mutation(() => Boolean)
    removeProduct(@Args('input', { type: () => RemoveProductDto }, ValidationPipe) input: RemoveProductDto): true {
        this.productsService.removeProduct(input);

        return true;
    }
}
