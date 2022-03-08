import { InjectRedis } from '@nestjs-modules/ioredis';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Redis } from 'ioRedis';

@Injectable()
export class RedisCacheService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

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