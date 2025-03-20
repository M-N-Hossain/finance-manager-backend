import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entry } from './entities/entity.entity';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entry)
    private entityRepository: Repository<Entry>,
    private categoryService: CategoryService,
  ) {}

  async create(createEntityDto: CreateEntityDto) {
    const category = await this.categoryService.findByTitle(
      createEntityDto.category,
    );

    const entity = { ...createEntityDto, category: category };

    return this.entityRepository.save(entity);
  }

  findAll() {
    const entities = this.entityRepository.find({
      relations: ['category'],
    });

    if (!entities) {
      throw new Error('No entities found');
    }

    return entities;
  }

  findOne(id: number) {
    return `This action returns a #${id} entity`;
  }

  update(id: number, updateEntityDto: UpdateEntityDto) {
    return `This action updates a #${id} entity`;
  }

  remove(id: number) {
    return `This action removes a #${id} entity`;
  }
}
