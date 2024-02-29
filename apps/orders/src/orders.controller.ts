import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('orders')
  getHello(): any {
    return this.ordersService.all();
  }

  @Post('orders')
  createOrder(@Body() data: OrderDto): any {
    return this.ordersService.create(data);
  }
}
