import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {PaymentDto} from './payment.dto'

import  {PaymentStatus } from '.prisma/client/payments'
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {

  constructor(
    private prismaService: PrismaService,

    @Inject('PAYMENTS_SERVICE')
    private kafkaClient: ClientKafka
  ) {}

  async all() {
    const payments = await this.prismaService.payment.findMany()

    return payments
  }

  async payment(data: PaymentDto) {
    const payment = await this.prismaService.payment.create({
      data: {
        ...data,
        amount: Number(data.amount),
        status: PaymentStatus.APPROVED,
        description: 'Payment approved',
        currency: 'BRL'
      }
    })

    await lastValueFrom(this.kafkaClient.emit('payments', payment))

    return payment
  }
}
