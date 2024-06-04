import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { User } from "../../auth/entities/user.entity";

@Entity({ name: 'products' })
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', {
    unique: true,
  })
  title: string

  @Column('float', {
    default: 0
  })
  price: number

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column('text',{
    unique: true
  })
  slug: string

  @Column('int', {
    default: 0
  })
  stock: number

  @Column('text', {
    array: true
  })
  size: string[]

  @Column('text')
  gender: string

  @Column('text', {
    array: true,
    default: [] 
  })
  tags: string[]
  
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
