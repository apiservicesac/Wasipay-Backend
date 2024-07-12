import { OrderEntity, OrderLineEntity, OrderPaymentEntity } from "@/order/domain/entities"
import { OrderDtoMapper } from "@/order/domain/mappers"
import { OrderRepository, OrderLineRepository, OrderPaymentRepository } from "@/order/domain/repositories"
import { CreateEntityException, UpdateEntityException } from "@/shared/exceptions"

export class CreateUseCase {

    private readonly _order_repository: OrderRepository
    private readonly _order_line_repository: OrderLineRepository    
    private readonly _order_payment_repository: OrderPaymentRepository

    constructor(
        order_repository: OrderRepository,
        order_line_repository: OrderLineRepository,
        order_payment_repository: OrderPaymentRepository
    ) {
        this._order_repository = order_repository
        this._order_line_repository = order_line_repository        
        this._order_payment_repository = order_payment_repository
    }

    async run(order: OrderEntity): Promise<OrderEntity> {
        const { order_lines, payment, ...without_order_lines } : any = order;
        const orderEntity: OrderEntity | null = await this._order_repository.save(without_order_lines)        
        if(orderEntity === null) throw new CreateEntityException("Error al crear la orden.")

        let _order_lines: OrderLineEntity[] | null = null
        if(typeof order_lines === 'object' && order_lines.length !== 0){
            _order_lines = await this._order_line_repository.save(order_lines as OrderLineEntity[])
        }        
        if(_order_lines === null) throw new CreateEntityException("Error al crear la orden.")       
        
        let _order_payment: OrderPaymentEntity | null = null
        if(typeof payment === 'object'){
            _order_payment = await this._order_payment_repository.save(payment as OrderPaymentEntity)
        }        
        console.log("_order_payment", _order_payment)
        if(_order_payment === null) throw new CreateEntityException("Error al crear la orden.")       
        
        await this._order_repository.update_field(orderEntity._id!, "payment", _order_payment._id)        
            
        const orderUpdated: OrderEntity | null = await this._order_repository.update_field(orderEntity._id!, "order_lines", _order_lines.flatMap((line) => line._id!))
        if(orderUpdated === null) throw new UpdateEntityException("Error al añadir las lineas de la orden")

        return OrderDtoMapper.toJson(orderUpdated)
    }

}
