import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entity.dto';
import { UpdateEntryDto } from './dto/update-entity.dto';
import { EntitiesService } from './entities.service';

@Controller('api/entries')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entitiesService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entitiesService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entitiesService.remove(+id);
  }
}
