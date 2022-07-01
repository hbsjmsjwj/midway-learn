const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// 添加三方 instrumentation
const { RedisInstrumentation } = require('@opentelemetry/instrumentation-redis');

const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { JaegerPropagator } = require('@opentelemetry/propagator-jaeger');
const exporter = new JaegerExporter({
  tags: [], // optional
  // You can use the default UDPSender
  host: 'localhost', // optional
  port: 6832, // optional
  // OR you can use the HTTPSender as follows
  // endpoint: 'http://localhost:14268/api/traces',
  maxPacketSize: 65000 // optional
});

// Midway 启动文件
const { Bootstrap } = require('@midwayjs/bootstrap');

// 初始化一个 open-telemetry 的 SDK
const sdk = new opentelemetry.NodeSDK({
  // 配置当前的导出方式，比如这里配置了一个输出到控制台的，也可以配置其他的 Exporter，比如 Jaeger
  // traceExporter: new ConsoleSpanExporter(),
  // 导出到jaeger
  traceExporter: exporter,
  textMapPropagator: new JaegerPropagator(),
  // 这里配置了默认自带的一些监控模块，比如 http 模块等
  instrumentations: [ new RedisInstrumentation(),getNodeAutoInstrumentations()]
});

// 初始化 SDK，成功启动之后，再启动 Midway 框架
sdk.start()
  .then(() => {
    return Bootstrap
      .configure(/**/)
      .run();
  });

// 在进程关闭时，同时关闭数据采集
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});