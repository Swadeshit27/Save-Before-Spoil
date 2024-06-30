export const reducedPrice = (price, daysLeft) => {
    if (daysLeft < 30) {
        const discountFactor = Math.max(0.4, daysLeft / 30);
        let newPrice = price * discountFactor;
        return Math.round(newPrice);
    }
    return price;
};

export function daysLeft(expireDateString) {
    const expireDate = new Date(expireDateString);
    const currentDate = new Date();
    const timeDifference = expireDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
}