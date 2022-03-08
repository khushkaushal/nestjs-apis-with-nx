import { Test, TestingModule } from '@nestjs/testing'
import { AvengersController } from './avengers.controller'
import { AvengersService } from './avengers.service'

describe('AvengersController', () => {
  let controller: AvengersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvengersController],
      providers: [AvengersService],
    }).compile()

    controller = module.get<AvengersController>(AvengersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
