import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor (
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {

    try {
      
      const product = this.productRepository.create(createProductDto)

      await this.productRepository.save(product)

      return product;

    } catch (error) {
      return this.handleDBExceptions( error )
    }


  }

  findAll() {
    return this.productRepository.find();
  }

  async findOneById(id: string) {

    const productId = await this.productRepository.findOneBy({ id })

    if ( !productId ) throw new NotFoundException(`Product with id: ${id} not found`)

    return productId;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {

    const product = await this.findOneById(id)

    await this.productRepository.remove(product)
    return `Product with ${id} removed`;
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' ){
      this.logger.error(error)
      throw new BadRequestException( error.detail )
    }
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }

}
