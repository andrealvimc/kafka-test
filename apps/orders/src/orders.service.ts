import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { Order, OrderStatus } from '.prisma/client/orders';
import {OrderDto} from './order.dto';

import {ClientKafka} from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor( 
    private prismaService: PrismaService,
    
    @Inject('ORDERS_SERVICE')
    private kafkaClient: ClientKafka
  ) {}
  
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

    await lastValueFrom(this.kafkaClient.emit('orders', order))
    return order
  }

  async complete(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.prismaService.order.update({
      where: {id},
      data: {status}
    })

    return order
  }
}
