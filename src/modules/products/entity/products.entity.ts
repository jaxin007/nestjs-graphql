import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductsEntity {
    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    price: number;

    @Field()
    createdAt: number;

    @Field({ nullable: true })
    createdAtInHumanFormat?: string;
}
