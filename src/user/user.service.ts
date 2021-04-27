import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(data);
    this.userRepository.save(newUser);
    
    return newUser;
  }

  async findAll() {
    const Users = this.userRepository.find({});

    return Users;
  }

  // create(createUserInput: CreateUserInput) {
  //   return 'This action adds a new user';
  // }


  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
