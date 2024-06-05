import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { User } from "../../auth/entities/user.entity";

@Entity({ name: 'products' })
export class Product {

  @ApiProperty({
    example: '1e10e09d-eb51-409b-9770-21f6a8a84799',
    description: 'Product ID (UUID)',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    example: 'Zero Emissions (Almost) Onesie',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0
  })
  price: number

  @ApiProperty({
    example: 'Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.',
    description: 'Product Description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @ApiProperty({
    example: 'zero_emissions_(almost)_onesie',
    description: 'Product SLUG - for SEO',
    uniqueItems: true
  })
  @Column('text',{
    unique: true
  })
  slug: string

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
  })
  @Column('int', {
    default: 0
  })
  stock: number

  @ApiProperty({
    example: [ 'XS','S'],
    description: 'Product sizes',
  })
  @Column('text', {
    array: true
  })
  size: string[]

  @ApiProperty({
    example: 'kid',
    description: 'Product gender',
  })
  @Column('text')
  gender: string

  @ApiProperty({
    example: ["shirt"],
    description: 'Product tags',
  })
  @Column('text', {
    array: true,
    default: [] 
  })
  tags: string[]

  @ApiProperty({
    example: [
      "1473834-00-A_2_2000.jpg",
      "1473829-00-A_2_2000.jpg"
    ],
    description: 'Product images',
  })
  @OneToMany(
    () => ProductImage,
    ( productImage ) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[]

  @ManyToOne(
    () => User,
    ( user ) => user.product,
    { eager: true }
    // eager: carga automaticamente la relación
  )
  user: User

  @BeforeInsert()
  checkSlugInsert() {
    if ( !this.slug ) {
        this.slug = this.title      
    }

    this.slug = this.slug.toLocaleLowerCase()
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll(",", "_")
    .replaceAll("'", "_")
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replaceAll(";", "")
    .replaceAll("?", "")
    .replaceAll("=", "")
    .replaceAll("/", "")
    .replaceAll(">", "")
    .replaceAll("<", "")

  }

  @BeforeUpdate()
  checkSlugUpdate() {
    
    this.slug = this.slug
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll(",", "_")
    .replaceAll("'", "_")
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replaceAll(";", "")
    .replaceAll("?", "")
    .replaceAll("=", "")
    .replaceAll("/", "")
    .replaceAll(">", "")
    .replaceAll("<", "")

  }

}
