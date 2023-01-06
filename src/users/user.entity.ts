import { association } from 'src/associations/association.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    lastname : string;

    @Column()
    firstname : string;

    @Column()
    age : number;

    @Column()
    username : string;

    @Column()
    password : string;
}
