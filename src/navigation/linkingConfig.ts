import { LinkingOptions } from "@react-navigation/native"
import { RootStackParamList } from "./types"

export const linkingConfig: LinkingOptions<RootStackParamList> = {
    prefixes: ['myapp://'],
    config: {
        screens: {
            Auth: {
                screens: {
                    Phone: 'login',
                    OTP: 'otp',
                    Register: 'register',
                    Welcome: 'welcome',
                }
            },
            App: {
                screens: {
                    MainTabs: {
                        screens: {
                            Home: 'home',
                            Search: 'search',
                            Notifications: 'notifications',
                            Profile: 'profile',
                        }
                    }
                }
            }
        }
    }
}