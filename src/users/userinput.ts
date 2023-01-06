import { ApiCreatedResponse } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";
@ApiCreatedResponse({
    description: 'The user has been successfully created.'
})
export class UserInput {
    @ApiProperty({
        description: 'The firtname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The password of the user',
        example: "password",
        default : "password",
        type: String,
    })
    public password:string;

    @ApiProperty({
        description: 'The username of the user',
        example: "johndoe",
        default : "johndoe",
        type: String,
    })
    public username:string;

}
