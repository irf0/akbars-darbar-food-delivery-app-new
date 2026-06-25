import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type AuthStackParamList = {
    Phone: undefined
    OTP: { phoneNumber: string, }
    Register: { phoneNumber: string }
    Welcome: undefined
}

export type BottomTabsParamList = {
    Home: undefined
    Menu: undefined
    Notifications: undefined
    Profile: undefined
}

export type AppStackParamList = {
    MainTabs: NavigatorScreenParams<BottomTabsParamList>
    FullMenu: { category?: string } | undefined
    MenuDetails: { itemId: string }
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