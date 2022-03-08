import { Test, TestingModule } from '@nestjs/testing'
import { AvengersService } from './avengers.service'
import { Avenger } from './entities/avenger.entity'

describe('AvengersService', () => {
  let service: AvengersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvengersService],
    }).compile()

    service = module.get<AvengersService>(AvengersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an avenger', () => {
    const avenger = new Avenger("1", "Test Aveng", 199, "singing");
    service.create(avenger)
    expect(service.findOne("1"))
  })
})
