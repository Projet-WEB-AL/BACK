import { Inject, Injectable } from '@nestjs/common';
import {User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equal } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { last } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
const saltOrRounds = 10;


@Injectable()
export class UsersService {

    @Inject(JwtService)
    jwtService: JwtService;

    constructor(
            @InjectRepository(User)
            private repository: Repository<User>
        ) {}

    async create(lastname : string , firstname: string, age: number,username:string,password:string): Promise<User>{

        const hash = await bcrypt.hash( password, saltOrRounds);

        if (lastname === undefined) {
            throw new Error("lastname is undefined");
        }
        if (firstname === undefined) {
            throw new Error("firstname is undefined");
        }
        if (age === undefined) {
            throw new Error("age is undefined");
        }
        if (username === undefined) {
            throw new Error("username is undefined");
        }
        if (password === undefined) {
            throw new Error("password is undefined");
        }

        const newUser = await this.repository.create({
                   
            lastname: lastname, 
            firstname: firstname, 
            age: age ,
            username: username,
            password: hash
            
        })
        this.repository.save(newUser);

        return newUser;
    }


    //get the user from the token with jwt service
    async getByToken(token : string) : Promise<User>{

        const decoded = this.jwtService.decode(token);

        const id = decoded['username'];

        return this.getByID(id);
    }
    



    getAll() : Promise<User[]>{
        return this.repository.find();
    }

    getByID(id : number ) : Promise<User>{
        return this.repository.findOne({where: {id: Equal(id)}});
    }

    //get all users STARTING with "s"
    async getByName(name : string) : Promise<User[]>{
        const out : User[] = [];
        (await this.getAll()).forEach(element => {
            if(element.username.startsWith(name) || element.lastname.startsWith(name) || element.firstname.startsWith(name)){
                out.push(element);
                
            }
        }
        );
        return out;
    }

    async getByusername(username : string) : Promise<User>{
        return await this.repository.findOne({where: {username: Equal(username)}});
    }


    async update(lastname: string, firstname: string, age: number,id : number,username : string,password:string): Promise<User> {
        
        if (lastname !== undefined){
            this.repository.update(id, {lastname: lastname});
        }
        if(firstname !== undefined ){
            this.repository.update(id, {firstname: firstname});
        }

        if(username !== undefined){
            this.repository.update(id, {username: username});
        }

        if(age !== undefined){
            this.repository.update(id, {age: age});
        }

        /*
        if(password !== undefined){
            const hash = await bcrypt.hash( password, saltOrRounds);
            this.repository.update(id, {password: hash});
        }*/
        
        return this.getByID(id);

    }

    async delete(id:number) : Promise<User> {

        const removed = this.getByID(id);
        this.repository.delete(id);
        return removed;
    }


}