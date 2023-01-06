import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { association } from './association.entity';


@Module({
  
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [UsersModule,TypeOrmModule.forFeature([User,association])],
  exports: [AssociationsService]

})

export class AssociationsModule {}
