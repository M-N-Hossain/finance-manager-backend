import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../categories/categories.module';
import { Entry } from './entities/entry.entity';
import { EntitiesController } from './entries.controller';
import { EntitiesService } from './entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), CategoryModule],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
