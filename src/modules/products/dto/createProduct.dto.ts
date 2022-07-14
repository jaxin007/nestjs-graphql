import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, Min } from 'class-validator';

@InputType()
export class CreateProductDto {
    @IsString()
    @Field(() => String)
    title: string;

    @Min(10)
    @IsInt()
    @Field(() => Int)
    price: number;
}
