import { Test, TestingModule } from '@nestjs/testing';
import { BuscarController } from './buscar.controller';

describe('BuscarController', () => {
  let controller: BuscarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuscarController],
    }).compile();

    controller = module.get<BuscarController>(BuscarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
