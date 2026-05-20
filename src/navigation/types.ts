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
    Cart: undefined
    PlaygroundMenu: undefined;
    ButtonPreview: undefined;
    InputPreview: undefined;
    DividerPreview: undefined;
    CardPreview: undefined
    BadgePreview: undefined
    AvatarPreview: undefined
    LoaderPreview: undefined
    SkeletonPreview: undefined
    EmptyStatePreview: undefined
    ToastPreview: undefined
    ModalPreview: undefined
    BottomSheetPreview: undefined
    HeaderPreview: undefined
    ListItemPreview: undefined
    SplashPreview: undefined
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