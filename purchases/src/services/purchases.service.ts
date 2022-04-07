import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka/kafka.service';

interface ICreatePurchasesParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchaseServices {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async listAllPurchases() {
    return this.prisma.purchases.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllFromCustomer(customerId: string) {
    return this.prisma.purchases.findMany({
      where: {
        customerId,
      },
    });
  }

  async createPurchase({ customerId, productId }: ICreatePurchasesParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    const purchase = await this.prisma.purchases.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    this.kafka.emit('purchase.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: productId,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
