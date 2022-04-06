import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ApolloDriver } from '@nestjs/apollo';
import path from 'node:path';
import { CourseResolver } from './graphql/resolvers/course.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver';
import { StudentResolver } from './graphql/resolvers/students.resolver';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/students.service';
import { EnrollmentService } from '../services/enrollment.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CourseResolver,
    EnrollmentResolver,
    StudentResolver,

    CourseService,
    EnrollmentService,
    StudentService,
  ],
})
export class HttpModule {}
