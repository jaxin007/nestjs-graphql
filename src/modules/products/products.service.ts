import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import * as productsMock from '../../common/mocks/products.mock.json';
import { ProductsEntity } from './entity/products.entity';
import { GetProductsListDto } from './dto/getProductsList.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { RemoveProductDto } from './dto/removeProduct.dto';

@Injectable()
export class ProductsService {
    private readonly millsInMinute = 60000;

    private readonly productsMockFilePath = path.join(process.cwd(), 'src/common/mocks/products.mock.json');

    // just for demonstration purposes
    private static convertTimestampToHumanFormat(timestamp: number) {
        return new Date(timestamp).toTimeString();
    }

    private static reWriteProductMocksFile(filePath: string, dataToWrite: ProductsEntity[]): void {
        return fs.writeFileSync(filePath, JSON.stringify(dataToWrite, null, '\t'));
    }

    getProducts(filter: GetProductsListDto): ProductsEntity[] {
        return (productsMock as ProductsEntity[]).filter((product) => {
            const [minPrice, maxPrice] = filter.priceRange;

            const isProductNew = product.createdAt >= Date.now() - 30 * this.millsInMinute;

            const isPriceFit = product.price >= minPrice && product.price <= maxPrice;

            product.createdAtInHumanFormat = ProductsService.convertTimestampToHumanFormat(product.createdAt);

            return filter.isNew ? isProductNew && isPriceFit : !isProductNew && isPriceFit;
        });
    }

    createProduct(input: CreateProductDto): ProductsEntity {
        const createdAt = Date.now();

        // get last id of entity and increment it for the new one
        const id = productsMock[productsMock.length - 1].id + 1;

        const createdAtInHumanFormat = ProductsService.convertTimestampToHumanFormat(createdAt);

        const product = {
            id,
            price: input.price,
            title: input.title,
            createdAt,
            createdAtInHumanFormat,
        };

        ProductsService.reWriteProductMocksFile(this.productsMockFilePath, [...productsMock, product]);

        return product;
    }

    removeProduct(input: RemoveProductDto): void {
        const productIndex = productsMock.findIndex((v) => v.id === input.id);

        if (productIndex === -1) {
            throw new NotFoundException();
        }

        productsMock.splice(productIndex, 1);

        ProductsService.reWriteProductMocksFile(this.productsMockFilePath, productsMock);
    }
}
