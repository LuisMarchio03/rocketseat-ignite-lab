import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductServices } from '../../../services/products.service';
import { PurchaseServices } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseServices: PurchaseServices,
    private productServices: ProductServices,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchaseServices.listAllPurchases();
  }

  // @ResolveField()
  @ResolveField(() => Product) //! PODE DAR ERRO
  product(@Parent() purchase: Purchase) {
    return this.productServices.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    return this.purchaseServices.createPurchase({
      customerId: user.sub,
      productId: data.productId,
    });
  }
}
