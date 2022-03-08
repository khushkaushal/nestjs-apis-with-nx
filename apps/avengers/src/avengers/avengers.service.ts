import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAvengerDto } from './dto/create-avenger.dto'
import { UpdateAvengerDto } from './dto/update-avenger.dto'
import { Avenger } from './entities/avenger.entity'
import { v4 as uuid } from 'uuid';

@Injectable()
export class AvengersService {

  private avengers: Avenger[] = [];

  create(createAvengerDto: CreateAvengerDto) {
    const Id = uuid();
    const newAvenger = new Avenger(Id, createAvengerDto.name, createAvengerDto.strength, createAvengerDto.ability);
    this.avengers.push(newAvenger);
    return `${createAvengerDto.name} added to avengers with ID: ${Id}`
  }

  findAll() {
    return {...this.avengers}
  }

  findOne(id: string) {
    const avenger = this.findAvenger(id)[0]
    return {...avenger};
  }

  update(id: string, updateAvengerDto: UpdateAvengerDto) {
    const [avenger, index] = this.findAvenger(id);
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
    this.avengers[index] = updatedAvenger;
    return `${id} avenger updated`
  }

  remove(id: string) {
    const [avenger, index] = this.findAvenger(id);
    this.avengers.splice(index, 0);
    return `${avenger.name} removed from the Avengers`
  }

  private findAvenger(id: string): [Avenger, number] {
    const avengerIndex = this.avengers.findIndex((avenger) => (avenger.id = id));
    const avenger = this.avengers[avengerIndex];
    if (!avenger) {
      throw new NotFoundException();
    }
    return [avenger, avengerIndex];
  }
}
