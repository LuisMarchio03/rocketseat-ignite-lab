import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

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
}
