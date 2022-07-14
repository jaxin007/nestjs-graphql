import { IsInt } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveProductDto {
    @IsInt()
    @Field(() => Int)
    id: number;
}
