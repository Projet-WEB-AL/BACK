import { Injectable } from '@nestjs/common';
import {association} from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AssociationsService {


    constructor(
        private userService: UsersService,
        @InjectRepository(association)
        private repository: Repository<association>,

    ) {}

    async create(name : string,description : string,address:string,phone:string,email:string,webSite:string,users : string[]): Promise<association>{

        const userNew : User[] = [];

        for(let i=0;i<users.length;i++){
            let add = await this.userService.getByusername(users[i]['id']);
            
            userNew.push(add);
        
        }

        let newAsso = await this.repository.create({
            name : name,
            users : userNew,
            address : address,
            phone : phone,
            email : email,
            webSite : webSite,
            description : description
        })


        this.repository.save(newAsso);

        return newAsso;
    }


    //get all associations STARTING with "s"
    async getByName(name : string) : Promise<association[]>{
        const out : association[] = [];
        (await this.getAssociations()).forEach(element => {
            if(element.name.startsWith(name)){
                out.push(element);
            }
        }

        );
        return out;
    }



    async getAssociations() : Promise<association[]>{
        return this.repository.find();
    }


    async getByID(id : number ) : Promise<association>{
        return this.repository.findOne({where: {id: id}});

    }

    async getMembers(id : number ) : Promise<User[]>{
        const out : User[] = [];
        (await this.getAssociations()).forEach(async element => {
            out.push(await this.userService.getByID(element.id));
        });
        return out;
    }

    async update(id : number,name : string,description : string,address:string,phone:string,email:string,webSite:string,users : string[]): Promise<association> {

        if (name !== undefined){
            this.repository.update(id, {name: name});
        }

        if(users !== undefined ){
            
            
            const userNew : User[] = [];

            for(let i=0;i<users.length;i++){
                let add = await this.userService.getByusername(users[i]['id']);
            
                userNew.push(add);
            
            }


            let newAsso = await this.getByID(id);

            newAsso.users = userNew;

            this.repository.save(newAsso);

        }

        if(description !== undefined){
            this.repository.update(id, {description: description});
        }
        if(address !== undefined){
            this.repository.update(id, {address: address});
        }
        if(phone !== undefined){
            this.repository.update(id, {phone: phone});
        }
        if(email !== undefined){
            this.repository.update(id, {email: email});
        }
        if(webSite !== undefined){
            this.repository.update(id, {webSite: webSite});
        }


        return this.getByID(id);

    }

    async delete(id:number) : Promise<association> {

        const removed = await this.getByID(id);
        this.repository.delete(id);
        return removed;
    }



}