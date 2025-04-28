import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../categories/categories.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entry)
    private entityRepository: Repository<Entry>,
    private categoryService: CategoryService,
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    const category = await this.categoryService.findByTitle(
      createEntryDto.category,
    );

    const entity = { ...createEntryDto, category: category };

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

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entity`;
  }

  delete(id: number) {
    return `This action removes a #${id} entity`;
  }
}
