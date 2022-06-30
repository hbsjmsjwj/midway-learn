import {
  Consumer,
  MSListenerType,
  RabbitMQListener,
  Inject,
  Provide,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/rabbitmq';
import { ConsumeMessage } from 'amqplib';

@Provide()
@Consumer(MSListenerType.RABBITMQ)
export class UserConsumer {
  @Inject()
  ctx: Context;

  @Inject()
  logger;

  @RabbitMQListener('tasks')
  async gotData(msg: ConsumeMessage) {
    this.logger.info('test output =>', msg.content.toString('utf8'));
    this.ctx.channel.ack(msg);
  }
}
