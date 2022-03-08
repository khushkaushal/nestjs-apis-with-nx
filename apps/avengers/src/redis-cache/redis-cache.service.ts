import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioRedis';

@Injectable()
export class RedisCacheService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(key): Promise<any> {
        return await this.redis.get(key);
    }

    async set(key, value) {
        await this.redis.set(key, value);
    }

    async reset() {
        await this.redis.reset();
    }

    async del(key) {
        await this.redis.del(key);
    }
    
    async getAllValues() {
      const keys = await this.redis.keys('*');
      return await this.redis.mget(keys);
    }
}