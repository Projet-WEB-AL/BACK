import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from './associations.service';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity()
export class association{
    
    @PrimaryGeneratedColumn()
    id :number;
    
    @Column()
    name : string;

    @Column()
    description : string;

    @Column()
    address : string;

    @Column()
    phone : string;

    @Column()
    email : string;

    @Column()
    webSite : string;    

    @ManyToMany(type => User, { eager: true })
    @JoinTable()
    users: User[];
    
}
