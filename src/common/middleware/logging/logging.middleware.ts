import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('RQ-RS response time');

    res.on('finish', () => {
      console.timeEnd('RQ-RS response time');
    })
    next();
  }
}
