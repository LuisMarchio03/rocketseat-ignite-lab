import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductServices } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';

import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productServices: ProductServices) {}

  @Query(() => [Product])
  products() {
    return this.productServices.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productServices.createProduct(data);
  }
}
