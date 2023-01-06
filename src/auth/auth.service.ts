import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;



@Injectable()
export class AuthService {

    constructor(
        //private userService: UsersService,
        private jwtService: JwtService
    ) {}
    @Inject(UsersService)
    private readonly userService : UsersService;
    
    public async validateUser(name: string, password: string) : Promise<User> {
        const user = await this.userService.getByusername(name);
        if(user !== undefined  && bcrypt.compareSync( password,user.password)){
            return user;
        }
        return undefined;
    }

    async login(user: any) {
        const payload = { username: user.id };
        let tk = this.jwtService.sign(payload);
        

        return {
            access_token: tk,
            
        };
    }
}
