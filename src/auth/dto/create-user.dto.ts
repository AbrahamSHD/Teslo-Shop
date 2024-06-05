import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  
  @ApiProperty({
    example: 'Juan Perez',
    description: 'User name',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  fullName: string

  @ApiProperty({
    example: 'juan1@gmail.com',
    description: 'User email',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'User Password - It is encrypted when saved',
    nullable: false,
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string

}
