import React from "react";
import type {  MenuItem } from "../types";
import { OrderActions, TypeActionsEnum } from "../reducers/order-reducer";

type MenuItemProps = {
  item: MenuItem,
  dispacht: React.Dispatch<OrderActions>
}

export default function MenuItem({item, dispacht} : MenuItemProps) {
  return (
      <button 
        className=' border-2 border-teal-400 hover:bg-teal-200 p-3 text-lg  rounded-lg flex justify-between w-full'
        onClick={() => dispacht({type: TypeActionsEnum.AddToCart, payload: {item: item}})}
      > 
          <p>{item.name}</p> 
          <p className='font-black'>${item.price}</p>
      </button>
  )
}
