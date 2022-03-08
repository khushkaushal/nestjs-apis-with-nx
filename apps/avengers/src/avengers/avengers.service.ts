import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAvengerDto } from './dto/create-avenger.dto'
import { UpdateAvengerDto } from './dto/update-avenger.dto'
import { Avenger } from './entities/avenger.entity'
import { v4 as uuid } from 'uuid';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class AvengersService {

  constructor(private cacheManager: RedisCacheService) {}

  private avengers: Avenger[] = [];

  async create(createAvengerDto: CreateAvengerDto) {
    const Id = uuid();
    const newAvenger = new Avenger(Id, createAvengerDto.name, createAvengerDto.strength, createAvengerDto.ability);
    this.avengers.push(newAvenger);
    await this.cacheManager.set(Id, JSON.stringify(newAvenger));
    return `${createAvengerDto.name} added to avengers with ID: ${Id}`
  }

  async findAll() {
    const values = await this.cacheManager.getAllValues();
    return (values);
  }

  async findOne(id: string) {
    const value = await this.cacheManager.get(id);
    return JSON.parse(value);
  }

  async update(id: string, updateAvengerDto: UpdateAvengerDto) {
    const avenger = JSON.parse(await this.cacheManager.get(id));
    const updatedAvenger = {...avenger};
    if (updateAvengerDto.name) {
      updatedAvenger.name = updateAvengerDto.name;
    }
    if (updateAvengerDto.strength) {
      updatedAvenger.strength = updateAvengerDto.strength;
    }
    if (updateAvengerDto.ability) {
      updatedAvenger.ability = updateAvengerDto.ability;
    }
    await this.cacheManager.set(id, JSON.stringify(updatedAvenger));
    return `${id} avenger updated`
  }

  async remove(id: string) {
    const avenger = JSON.parse(await this.cacheManager.get(id));
    await this.cacheManager.del(id);
    return `${avenger.name} removed from the Avengers`
  }

}
