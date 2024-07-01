import { OrderEntity, OrderLineEntity } from "@/order/domain/entities"
import { OrderDtoMapper } from "@/order/domain/mappers"
import { OrderRepository, OrderLineRepository } from "@/order/domain/repositories"
import { CreateEntityException, UpdateEntityException } from "@/shared/exceptions"

export class CreateUseCase {

    private readonly _order_repository: OrderRepository
    private readonly _order_line_repository: OrderLineRepository    

    constructor(
        order_repository: OrderRepository,
        order_line_repository: OrderLineRepository,
    ) {
        this._order_repository = order_repository
        this._order_line_repository = order_line_repository        
    }

    async run(order: OrderEntity): Promise<OrderEntity> {

        const orderEntity: OrderEntity | null = await this._order_repository.save(order)
        if(orderEntity === null) throw new CreateEntityException("Error al crear la orden.")

        
        let order_lines: OrderLineEntity[] | null = null
        if(typeof order.order_lines === 'object' && order.order_lines.length !== 0){
            order_lines = await this._order_line_repository.save(order.order_lines as OrderLineEntity[])
        }        
        if(order_lines === null) throw new CreateEntityException("Error al crear la orden.")
        
        const orderUpdated: OrderEntity | null = await this._order_repository.update_field(orderEntity._id!, "order_lines", order_lines.flatMap((line) => line._id!))
        if(orderUpdated === null) throw new UpdateEntityException("Error al añadir las lineas de la orden")

        return OrderDtoMapper.toJson(orderUpdated)
    }

}
