import { ApiProperty } from "@nestjs/swagger"
import { Column, PrimaryColumn } from "typeorm";

export class RoleInput {

    @ApiProperty({
        description: 'The name of the role of the given user in the given association',
        example: "President",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The description of the role',
        example: "The president of the association",
        type: String,
    })
    public description: string;

    @ApiProperty({ 
        description: 'id',
        example: "1",
        type: Number,
    })
    public idRole: number

}