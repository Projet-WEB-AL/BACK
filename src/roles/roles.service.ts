import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {


    @Inject(JwtService)
    jwtService: JwtService;

    constructor(
            @InjectRepository(Roles)
            private repository: Repository<Roles>
        ) {}

    async create(name : string , description: string): Promise<Roles>{
        if (name === undefined) {
            throw new Error("name is undefined");
        }
        if (description === undefined) {
            throw new Error("description is undefined");
        }

        const newRole = await this.repository.create({
                   
            name: name, 
            description: description, 
        })
        this.repository.save(newRole);

        return newRole;
    }

    async getRoles() : Promise<Roles[]>{
        return await this.repository.find();
    }

    async getById(id : number) : Promise<Roles>{
        
        return this.repository.findOne({where: {id: Equal(id)}});
    }

    async getByName(name : string) : Promise<Roles>{
            
            return this.repository.findOne({where: {name: Equal(name)}});
        }

    async deleteById(id : number) : Promise<Roles>{
        const role = await this.repository.findOne({where: {id: Equal(id)}});
        this.repository.delete(role);
        return role;
    }

    async update(id : number, name : string , description: string) : Promise<Roles>{
        const role = await this.repository.findOne({where: {id: Equal(id)}});
        role.name = name;
        role.description = description;
        this.repository.save(role);
        return role;
    }


    




}
