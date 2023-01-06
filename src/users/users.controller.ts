import { Controller, Get,Body, Post,Param, Put, Delete,HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserInput } from './userinput';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private service : UsersService
    ){}


    
    @Post()
    async create(@Body() input: UserInput): Promise<User> {
        console.log(input.username);
        return await this.service.create(input.lastname,input.firstname,input.age,input.username,input.password);
    }



    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll():Promise<User[]>{
        return this.service.getAll();
    }


    @Get(':id')
    async getById(@Param() parameter): Promise<User> {
        let data = await this.service.getByID(parameter.id);
        if(data === undefined|| data === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        
        return await this.service.getByID(parameter.id);
    }


    @Get(':id/existUsername')
    async existUsername(@Param() parameter): Promise<boolean> {
        let data = await this.service.getByusername(parameter.id);
        if (data === undefined || data === null) {
            return true;
        }
        else {
            return false;
        }

    }


    @Get(':id/username')
    async getByUsername(@Param() parameter): Promise<User> {
        let data = await this.service.getByusername(parameter.id);
        if(data === undefined|| data === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        
        return await this.service.getByusername(parameter.id);
    }




    
    @Get(':id/startwith')
    async getBynames(@Param() parameter): Promise<User[]> {
        
        
        return await this.service.getByName(parameter.id);
    }


    //get the user from the token with jwt service
    //@UseGuards(AuthGuard('jwt'))
    @Get('private/current')
    async getByToken(@Param() parameter,@Req() req): Promise<User> {
        //recover the jwt token from the header
        const token = req.headers.authorization.split(' ')[1];;
        
        return await this.service.getByToken(token);
        
    }



    //bug entre le front et ici à regler

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param() parameter ,@Body() body : UserInput): Promise<User> {
    

        let user = await this.service.getByID(parameter.id);
        if(user === undefined|| user === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }

        return await this.service.update(body.lastname,body.firstname,body.age,parameter,body.username,body.password);
    }

    
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param() parameter): Promise<User> {

        let data = await this.service.getByID(parameter.id);
        if(data === undefined|| data === null ){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return await this.service.delete(parameter.id); 
    }

}
