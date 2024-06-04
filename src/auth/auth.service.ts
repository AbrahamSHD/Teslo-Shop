import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';

import { BcryptAdapter } from '../common/adapters/bcrypt.adapter'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
    private readonly bcrypt: BcryptAdapter,
  ) {}
  
  async create( createUserDto: CreateUserDto ) {

    try {
      
      const { password, ...userData } = createUserDto
      const user = this.userRepository.create({
        ...userData,
        password: this.bcrypt.hash( password )
      })

      await this.userRepository.save( user )
      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
      // TODO: Retornar JWT

      // return {
      //   user: userData
      // }
    } catch (error) {

      this.handleDBErrors( error )
      
    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    })

    if ( !user )
      throw new UnauthorizedException('Credentials are not valid(email)')

    if ( !this.bcrypt.compare( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid(pass)')

    //* Retornar el JWT 
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
    // try {
    // } catch (error) {
    //   this.handleDBErrors(error)
    // }

  }

  async checkAuthStatus( user: User ) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload )

    return token
  }

  private handleDBErrors( error: any ): never {
    
    this.logger.error(error)

    if ( error.code === '23505' ) {
      throw new BadRequestException( error.detail )
    }
    
    if ( error.code === '23502' ){
      throw new BadRequestException( error.detail )
    }

    throw new InternalServerErrorException('Please check server logs')

  }

}
