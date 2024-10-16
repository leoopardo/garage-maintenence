export interface baseResponseI<data>{
    data: data[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}