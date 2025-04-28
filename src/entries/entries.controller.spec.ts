import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesController } from './entries.controller';
import { EntitiesService } from './entries.service';

describe('EntitiesController', () => {
  let controller: EntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntitiesController],
      providers: [EntitiesService],
    }).compile();

    controller = module.get<EntitiesController>(EntitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
