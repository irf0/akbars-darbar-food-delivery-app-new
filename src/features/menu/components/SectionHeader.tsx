// import React, { memo, useCallback } from 'react'
// import { TouchableOpacity, Text, View } from 'react-native'
// import { styles } from '../styles/SectionHeader.styles'
// import Animated, {
//     useSharedValue,
//     useAnimatedStyle,
//     withTiming,
//     interpolate,
// } from 'react-native-reanimated'

// interface Props {
//     title: string
//     isCollapsed: boolean
//     onToggle: (title: string) => void
// }

// const SectionHeader = ({ title, isCollapsed, onToggle }: Props) => {
//     const rotation = useSharedValue(isCollapsed ? 0 : 1)

//     const handlePress = useCallback(() => {
//         rotation.value = withTiming(isCollapsed ? 1 : 0, { duration: 200 })
//         onToggle(title)
//     }, [isCollapsed, onToggle, title])

//     const chevronStyle = useAnimatedStyle(() => ({
//         transform: [
//             {
//                 rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg`,
//             },
//         ],
//     }))

//     return (
//         <TouchableOpacity
//             style={styles.container}
//             onPress={handlePress}
//             activeOpacity={0.7}
//         >
//             <Text style={styles.title}>{title}</Text>

//             <View style={styles.right}>
//                 {isCollapsed && (
//                     <Text style={styles.collapsedHint}>tap to expand</Text>
//                 )}
//                 <Animated.Text style={[styles.chevron, chevronStyle]}>
//                     ⌄
//                 </Animated.Text>
//             </View>
//         </TouchableOpacity>
//     )
// }

// export default memo(SectionHeader)