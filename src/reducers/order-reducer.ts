import { MenuItem, OrderItem } from "../types";

export enum TypeActionsEnum{
    AddToCart = "Add-To-Cart",
    RemoveToCart = "Remove-To-Cart",
    TipValue = "Tip-Value",
    ClearOrdes = "Clear-Ordes"
}

export type OrderActions =
    {type: TypeActionsEnum.AddToCart, payload:{item: MenuItem}}|
    {type: TypeActionsEnum.RemoveToCart, payload:{id: number}}|
    {type: TypeActionsEnum.TipValue, payload:{value: number}}|
    {type: TypeActionsEnum.ClearOrdes}

export type OrderState ={
    order: OrderItem[], 
    tip: number
}

export const initialState: OrderState ={
    order: [],
    tip: 0
}

export const orderReduce = (state: OrderState = initialState, action: OrderActions ) =>{
    switch (action.type) {
        case TypeActionsEnum.AddToCart: 
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)
        let updatedOrder: OrderItem[];
        if(itemExist) {
            updatedOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id ? 
                {...orderItem, quantity: orderItem.quantity + 1 } : 
                orderItem
            )         
        } else {
            const newOrder: OrderItem  = {...action.payload.item, quantity: 1}
            updatedOrder = [...state.order, newOrder]
        } 
            return{...state, order: updatedOrder}
        case TypeActionsEnum.RemoveToCart:
            return{...state, order: state.order.filter(item => item.id != action.payload.id)}
        case TypeActionsEnum.ClearOrdes:
            return{ ...state, order: [], tip: 0}
        case TypeActionsEnum.TipValue:
            return{
                ...state, 
                tip: action.payload.value
            }
        default:
            return state
    }
}