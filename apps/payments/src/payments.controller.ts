import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('')
  all() {
    return this.paymentsService.all();
  }

  @MessagePattern('orders')
  async payment(@Payload() message){
    await this.paymentsService.payment({
      amount: message.price,
      client_id: message.client_id,
      order_id: message.id
    })
  }
}
