import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { Order,  } from '.prisma/client/orders';

import {OrderDto} from './order.dto';

@Injectable()
export class OrdersService {
  constructor( private prismaService: PrismaService) {}
  
  async all(): Promise<Order[]> {
    return this.prismaService.order.findMany()
  }

  async create(data: OrderDto): Promise<Order> {
    const order = await this.prismaService.order.create({
        data: {
          client_id: data.client_id,
          price: data.price,
          status: 'PENDING'
        }
    })

    return order
  }
}
