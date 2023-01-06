import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private service : RolesService
    ){}

    @Get()
    async getRoles() : Promise<Roles[]>{
        return await this.service.getRoles();
    }
    
    @Get(':id')
    async getById(@Param() parameter) : Promise<Roles>{
        return await this.service.getById(parameter.id);
    }

    @Get(':name/byName')
    async getByName(@Param() parameter) : Promise<Roles>{
        return await this.service.getByName(parameter.name);
    }

    @Delete(':id')
    async deleteById(@Param() parameter) : Promise<Roles>{
        return await this.service.deleteById(parameter.id);
    }

    @Put(':id')
    async update(@Param() parameter) : Promise<Roles>{
        return await this.service.update(parameter.id,parameter.name,parameter.description);
    }



}
function Parameter() {
    throw new Error('Function not implemented.');
}

