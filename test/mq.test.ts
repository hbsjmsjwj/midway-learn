import { createRabbitMQProducer, close, createApp } from '@midwayjs/mock';

describe('/test/index.test.ts', () => {
  it('should test create message and get from app', async () => {
    // create a queue and channel
    const channel = await createRabbitMQProducer('tasks', {
      isConfirmChannel: true,
      mock: false,
      url: 'amqp://localhost',
    });

    // send data to queue
    channel.sendToQueue('tasks', Buffer.from('something to do'));

    // create app and got data
    const app = await createApp();

    // wait a moment

    await close(app);
  });
});
