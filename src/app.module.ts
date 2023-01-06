import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { association } from './associations/association.entity';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest',
    entities: [User,association,Role,Roles], //association_idusers_user
    synchronize: true,
}),

UsersModule, AssociationsModule, AuthModule, RoleModule, RolesModule],
  
  controllers: [AppController, ],
  providers: [AppService, 

  ],
})
export class AppModule {}
