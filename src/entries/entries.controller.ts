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
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntitiesService } from './entries.service';

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
  delete(@Param('id') id: string) {
    return this.entitiesService.delete(+id);
  }
}
