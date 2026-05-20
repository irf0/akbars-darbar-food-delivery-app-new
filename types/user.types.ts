export interface UserAddress {
    area: string
    building: string
    city: string
    street: string
}

export interface DarbarUser {
    uid: string
    phone: string
    firstName: string
    lastName: string
    isRegistered: boolean
    fcmToken: string
    address: UserAddress
    createdAt: string
}