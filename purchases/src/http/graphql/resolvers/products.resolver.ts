import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Product])
  @UseGuards(AuthorizationGuard)
  products() {
    return this.prisma.product.findMany();
  }
}
