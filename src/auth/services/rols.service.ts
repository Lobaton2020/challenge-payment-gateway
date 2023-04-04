import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { Rol } from '../entities/Rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/services/pagination.service';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rol) private readonly rolsRepository: Repository<Rol>,
    private readonly paginationService: PaginationService,
  ) {}
  async findAll(
    pagination: IPagination,
  ): Promise<Pagination<Rol, IPaginationMeta>> {
    return this.paginationService.paginate<Rol>(
      this.rolsRepository,
      pagination,
    );
  }
  async findOne(id: number): Promise<Rol> {
    return await this.rolsRepository.findOne({ where: { id } });
  }
  async findOneByName(name: string) {
    return await this.rolsRepository.findOne({ where: { name } });
  }
}
