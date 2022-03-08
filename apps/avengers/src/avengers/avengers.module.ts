import { Module } from '@nestjs/common'
import { AvengersService } from './avengers.service'
import { AvengersController } from './avengers.controller'
import { RedisCacheModule } from '../redis-cache/redis-cache.module'

@Module({
  imports: [RedisCacheModule],
  controllers: [AvengersController],
  providers: [AvengersService],
})
export class AvengersModule {}
