import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type AuthStackParamList = {
    Phone: undefined
    OTP: { phoneNumber: string }
    Register: { phoneNumber: string }
    Welcome: undefined
}

export type BottomTabsParamList = {
    Home: undefined
    Search: undefined
    Notifications: undefined
    Profile: undefined
}

export type AppStackParamList = {
    MainTabs: NavigatorScreenParams<BottomTabsParamList>
    PlaygroundMenu: undefined;
    ButtonPreview: undefined;
    InputPreview: undefined;
    DividerPreview: undefined;
    CardPreview: undefined
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