import { Controller, Get,Body, Post,Param, Put, Delete,HttpException, HttpStatus } from '@nestjs/common';
import { association } from './association.entity';
import { AssociationsService } from './associations.service';

import { User } from 'src/users/user.entity';
@Controller('associations')
export class AssociationsController {




    constructor(
        private service : AssociationsService
    ){}

    @Post()
    async create(@Body() input: any): Promise<association> {
        return await this.service.create(input.name,input.description,input.address,input.phone,input.email,input.webSite,input.users);
    }

    @Get()
    async getUsers():Promise<association[]>{
        return await this.service.getAssociations();
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<association> {

        let data = await this.service.getByID(parameter.id);
        if(data === undefined|| data === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return await this.service.getByID(parameter.id);
    }

    //get the association starting by a specific string

    @Get(':id/startwith')
    async getByName(@Param() parameter): Promise<association[]> {
        return await this.service.getByName(parameter.id);
    }


    @Get(':id/members')
    async getMembers(@Param() parameter): Promise<User[]> {
         return await this.service.getMembers(parameter.id); 
    }


    @Put(':id')
    async update(@Param() parameter, @Body() input : any): Promise<association> {

        let data = await this.service.getByID(parameter.id);
        if(data === undefined|| data === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return await this.service.update(parameter.id,input.name,input.description,input.address,input.phone,input.email,input.webSite,input.users);
    }

    @Delete(':id')
    async delete(@Param() parameter): Promise<association>{

        let data = await this.service.getByID(parameter.id);
        if(data === undefined|| data === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return await this.service.delete(parameter.id); 
    }




}
