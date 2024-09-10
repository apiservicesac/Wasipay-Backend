import { ProductEntity as Entity } from '@/product/domain/entities'
import { ProductDtoMapper } from '@/product/domain/mappers'
import { ProductRepository as Repository } from '@/product/domain/repositories'

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string, page: number, pageSize: number): Promise<{ data: Entity[], total: number } | null > {
        const result = await this._repository.getAll(shop_id, page, pageSize);
        const entities = result.rows.map((entity) => ProductDtoMapper.toJson(entity));
        return { data: entities, total: result.count }; // Retorna los datos y el total de registros
    }
}
