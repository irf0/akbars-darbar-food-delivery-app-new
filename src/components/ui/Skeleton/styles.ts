import { StyleSheet } from 'react-native'

export const createSkeletonStyles = (
    baseColor: string,
    radius: number,
    width: number | string,
    height: number,
) =>
    StyleSheet.create({
        bone: {
            backgroundColor: baseColor,
            borderRadius: radius,
            width: width as any,
            height,
            overflow: 'hidden',
        },
        linesContainer: {
            width: width as any,
        },
    })