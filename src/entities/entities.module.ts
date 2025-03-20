import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../categories/categories.module';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { Entry } from './entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), CategoryModule],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
