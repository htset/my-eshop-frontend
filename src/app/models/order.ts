import { CreditCard } from "./creditCard";
import { OrderDetail } from "./orderDetail";

export class Order{
    public id?: number;
    public userId?: number;
    public orderDate?: Date;
    public orderDetails?: OrderDetail[];
    public totalPrice?: number;
    public creditCard?: CreditCard;
    public deliveryAddressId?: number;
    public firstName?: string;
    public lastName?: string;
    public street?: string;
    public zip?: string;
    public city?: string;
    public country?: string;    
}