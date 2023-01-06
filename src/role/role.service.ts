import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Equal, Repository } from 'typeorm';
import { Role } from './role.entity';
import { association } from 'src/associations/association.entity';
import { Roles } from 'src/roles/roles.entity';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class RoleService {

    @Inject(JwtService)
    jwtService: JwtService;
    @Inject(RolesService)
    rolesService: RolesService;


    constructor(
            @InjectRepository(Role)
            private repository: Repository<Role>
        ) {}

    async create(association : association , user: User,role : Roles): Promise<Role>{

        if (association === undefined) {
            throw new Error("association is undefined");
        }
        if (user === undefined) {
            throw new Error("user is undefined");
        }

        const newRole = await this.repository.create({
            Associationid: association.id,
            Userid: user.id,
            Roleid: role.id
        })
        this.repository.save(newRole);

        return newRole;

    }


    async getRoles() : Promise<Role[]>{
        return await this.repository.find();
    }

    async getById(id : number) : Promise<Role>{
            
            return this.repository.findOne({where: {id: Equal(id)}});
        }

    async getRoleOfuserInAsso(association : association , user : User) : Promise<Roles>{
        const role = await this.repository.findOne({where: {Associationid: Equal(association.id), Userid: Equal(user.id)}});
        return this.rolesService.getById(role.Roleid);
    }


    async update(id : number, association : association , user: User, roles : Roles) : Promise<Role>{
        const role = await this.repository.findOne({where: {id: Equal(id)}});
        role.Associationid = association.id;
        role.Userid = user.id;
        role.Roleid = roles.id;
        this.repository.save(role);
        return role;
    }


    async deleteById(id : number) : Promise<Role>{
        const role = await this.repository.findOne({where: {id: Equal(id)}});
        this.repository.delete(role);
        return role;
    }



}
