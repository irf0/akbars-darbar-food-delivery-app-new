import { MenuItem, OrderType, PortionType } from 'types/index';

export const getItemPrice = (
    item: MenuItem,
    portion: PortionType,
    orderType: OrderType,
): number => {
    if (orderType === 'takeaway') {
        return Math.floor(
            portion === 'half' ? item.half_takeaway_price : item.full_takeaway_price,
        );
    }
    return Math.floor(
        portion === 'half' ? item.half_delivery_price : item.full_delivery_price,
    );

};

export const getItemPriceLabel = (item: MenuItem, orderType: OrderType): string => {
    const fullPrice = getItemPrice(item, 'full', orderType);
    const hasHalf = orderType === 'delivery'
        ? item.half_delivery_price > 0
        : item.half_takeaway_price > 0;

    if (!hasHalf) return `₹${fullPrice}`;

    const halfPrice = getItemPrice(item, 'half', orderType);
    return `₹${halfPrice}`;
};