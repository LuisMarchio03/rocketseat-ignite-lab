import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface ICreateProductParams {
  title: string;
}

@Injectable()
export class ProductServices {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: ICreateProductParams) {
    const slug = slugify(title, { lower: true });

    const productAlreadyExists = await this.prisma.product.findFirst({
      where: {
        slug,
      },
    });

    if (productAlreadyExists) {
      throw new Error('Product already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
