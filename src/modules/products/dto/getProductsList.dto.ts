import { ArrayMaxSize, ArrayMinSize, IsBoolean, IsInt } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetProductsListDto {
    @Field(() => Boolean)
    @IsBoolean()
    isNew: boolean;

    @Field(() => [Int], { defaultValue: [1000, 2000] })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsInt({ each: true })
    priceRange: [number, number];
}
