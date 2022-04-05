import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface ICreatePurchasesParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchaseServices {
  constructor(private prisma: PrismaService) {}

  async listAllPurchases() {
    return this.prisma.purchases.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: ICreatePurchasesParams) {
    const productAlreadyExists = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (productAlreadyExists) {
      throw new Error('Product already exists');
    }

    return this.prisma.purchases.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
