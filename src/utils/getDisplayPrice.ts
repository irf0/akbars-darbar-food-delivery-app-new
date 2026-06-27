import { MenuItem } from "types";

type OrderType = "delivery" | "takeaway";

export function getDisplayPrice(item: MenuItem, orderType: OrderType | null): number {
    if (!orderType) return 0;

    const [halfPrice, fullPrice] =
        orderType === "delivery"
            ? [item.half_delivery_price, item.full_delivery_price]
            : [item.half_takeaway_price, item.full_takeaway_price];

    const validPrices = [halfPrice, fullPrice].filter((price) => price > 0);

    if (validPrices.length === 0) return 0; // no valid price found, safe fallback

    return Math.min(...validPrices);
}