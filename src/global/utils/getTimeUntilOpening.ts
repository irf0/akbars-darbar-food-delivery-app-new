// utils/getTimeUntilOpening.ts

export const getTimeUntilOpening = (openingHour: number): string => {
    const now = new Date()
    const opening = new Date()
    opening.setHours(openingHour, 0, 0, 0)

    // if opening time already passed today, set for tomorrow
    if (now > opening) {
        opening.setDate(opening.getDate() + 1)
    }

    const diff = opening.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${hours}h ${minutes}m ${seconds}s`
}