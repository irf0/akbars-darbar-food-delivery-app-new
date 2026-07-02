export interface UserAddress {
    area: string
    building: string
    city: string
    street: string
    id: string
    label?: string
    isDefault: boolean,

}

export interface DarbarUser {
    uid: string
    phone: string
    firstName: string
    lastName: string
    isRegistered: boolean
    fcmToken: string
    addresses: UserAddress[]
    createdAt: string
}