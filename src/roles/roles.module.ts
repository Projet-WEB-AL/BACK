import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Module({    
    imports: [TypeOrmModule.forFeature([Roles]),JwtModule],
    controllers: [RolesController],
    providers: [RolesService,JwtService],
    exports: [RolesService]})
export class RolesModule {

}
