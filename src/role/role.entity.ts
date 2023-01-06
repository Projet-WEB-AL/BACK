
import { Roles } from 'src/roles/roles.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable } from 'typeorm';

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Userid : number;
    
    @Column()
    Associationid : number;

    @Column()
    Roleid: number;
    
    


}

