export interface IPagination {
  page: number;
  limit: number;
}

export interface IPaginationTypeOrm {
  take: number;
  skip: number;
}
