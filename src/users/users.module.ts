import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule],
  controllers: [UsersController],
  providers: [UsersService,JwtService],
  exports: [UsersService]
})
export class UsersModule {}
