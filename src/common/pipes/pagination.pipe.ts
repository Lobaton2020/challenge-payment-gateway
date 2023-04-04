import { ForbiddenException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { defaultPagination } from 'src/config/app.config';
import { IPagination } from '../interfaces/pagination.interface';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any): IPagination {
    const defaultValue = defaultPagination;

    try {
      const limit = Number(value?.limit) || defaultValue.limit;
      const page = Number(value?.page) || defaultValue.page;
      if (limit > defaultValue.limit) {
        throw new ForbiddenException('limit value is too big');
      }
      return { page: page, limit: limit };
    } catch (error) {
      new Logger(PaginationPipe.name).error(error);
      throw new ForbiddenException(error.message);
    }
  }
}