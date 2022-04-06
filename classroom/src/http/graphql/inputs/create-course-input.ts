import { Field } from '@nestjs/graphql';

export class CreateCourseInput {
  @Field()
  title: string;
}
