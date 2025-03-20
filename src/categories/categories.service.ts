import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findByTitle(title: string) {
    return this.categoryRepository.findOne({ where: { title } });
  }

  // findOne(id: string) {
  //   return this.categoryRepository.fin(id);
  // // }

  // update(id: string, updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  // }

  // delete(id: string) {
  //   return this.categoryModel.findByIdAndDelete(id);
  // }
}
