import { Module } from '@nestjs/common'
import { AvengersModule } from '../avengers/avengers.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [AvengersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
