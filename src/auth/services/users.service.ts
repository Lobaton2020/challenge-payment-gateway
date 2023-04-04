import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/User.entity';
import { RolsService } from './rols.service';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolService: RolsService,
  ) {}
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password', 'id', 'completeName', 'email', 'status'],
      relations: ['rol'],
    });
    if (user) return user;
    return null;
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneForRefreshToekn(id): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['password', 'id', 'completeName', 'email', 'status'],
      relations: ['rol', 'documentType'],
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const rol = await this.rolService.findOneByName(Role.RIDER); // by default the rol is USER
    if (!rol) throw new BadRequestException('Rol not found');
    const alreadyExistByEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (alreadyExistByEmail)
      throw new BadRequestException(
        'Email already exist, please try with other email',
      );
    const newUser = await this.userRepository.create(user);
    newUser.rol = rol;
    return await this.userRepository.save(newUser);
  }
  async changeStatus(id: number, status: boolean): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('User not found');
    user.status = status;
    await this.userRepository.update(user.id, { status: user.status });
    return user;
  }
}
