import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MenuItem } from '@types'

export type AuthStackParamList = {
    Phone: undefined
    OTP: { phoneNumber: string, }
    Register: { phoneNumber: string }
    Welcome: undefined
}

export type BottomTabsParamList = {
    Home: undefined
    Menu: { category?: string }
    Notifications: undefined
    Profile: undefined
}

export type AppStackParamList = {
    OrderType: undefined
    AddressPicker: undefined
    MainTabs: NavigatorScreenParams<BottomTabsParamList>
    MenuDetail: { item: MenuItem }
    Search: undefined
    Cart: undefined
}


export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>
    App: NavigatorScreenParams<AppStackParamList>
}

export type AuthScreenProps<T extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList, T>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}