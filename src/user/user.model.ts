import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: string;
  
  @Column()
  @Field(type => String)
  social_id: string;

  @Column()
  @Field(type => String)
  platform_type: string;

  // :TODO enum으로 수정?
  // @Column()
  // @Field(type => String)
  // status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  @Field(type => String)
  created_at: string;

  // :TODO
  // @Column()
  // @Field(type => String)
  // updated_at: string;
}
