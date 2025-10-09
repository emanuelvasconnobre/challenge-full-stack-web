export type PaginationOptions<Attr extends object = object, OrderBy = Attr> = {
  page?: number;
  pageSize?: number;
  attributes: Partial<Attr>;
  order: {
    attribute?: keyof OrderBy;
    type?: "asc" | "desc";
  };
};

export type PaginatedResult<D extends object = object> = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  order: {
    attribute: string;
    type: "asc" | "desc";
  };
  items: D[];
};
