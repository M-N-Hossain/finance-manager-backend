import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { EntitiesModule } from './entities/entities.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CategoryModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    EntitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
