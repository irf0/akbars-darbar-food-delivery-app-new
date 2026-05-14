// src/features/auth/screens/WelcomeScreen.tsx

import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ListRenderItemInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@theme';
import { useAuthStore } from '../store/useAuthStore';

const { width } = Dimensions.get('window');

interface Slide {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
}

const SLIDES: Slide[] = [
    {
        id: '1',
        icon: 'flash-outline',
        title: 'Fast & Reliable',
        subtitle: 'Everything you need, delivered instantly at your fingertips.',
    },
    {
        id: '2',
        icon: 'shield-checkmark-outline',
        title: 'Secure by Default',
        subtitle: 'Your data is protected with industry-grade encryption.',
    },
    {
        id: '3',
        icon: 'people-outline',
        title: 'Built for You',
        subtitle: 'A seamless experience tailored to the way you work.',
    },
];

export default function WelcomeScreen() {
    const { completeOnboarding, user } = useAuthStore();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const t = theme.light;
    const styles = createStyles(t);

    const isLastSlide = activeIndex === SLIDES.length - 1;

    const handleNext = () => {
        if (isLastSlide) {
            completeOnboarding(); // RootNavigator switches to AppStack automatically
            return;
        }
        flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index ?? 0);
        }
    }).current;

    const renderSlide = ({ item }: ListRenderItemInfo<Slide>) => (
        <View style={styles.slide}>
            <View style={styles.iconWrapper}>
                <Ionicons name={item.icon} size={48} color={t.colors.primary} />
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Greeting */}
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Welcome{user?.firstName ? `, ${user.firstName}` : ''}! 👋
                </Text>
                <Text style={styles.headerSubtitle}>Here's what you can do with the app.</Text>
            </View>

            {/* Carousel */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                keyExtractor={(item) => item.id}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                style={styles.flatList}
            />

            {/* Dots */}
            <View style={styles.dotsContainer}>
                {SLIDES.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === activeIndex && styles.dotActive,
                        ]}
                    />
                ))}
            </View>

            {/* CTA — only visible on last slide */}
            {isLastSlide && (
                <TouchableOpacity
                    style={[styles.button, t.shadow.md]}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>GET STARTED</Text>
                </TouchableOpacity>
            )}

            {/* Skip / Next on non-last slides */}
            {!isLastSlide && (
                <View style={styles.navRow}>
                    <TouchableOpacity onPress={completeOnboarding}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                        <Text style={styles.nextText}>Next</Text>
                        <Ionicons name="arrow-forward" size={16} color={t.colors.primary} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const createStyles = (t: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: t.colors.background,
        paddingBottom: t.spacing.xl,
    },
    header: {
        paddingHorizontal: t.spacing.lg,
        paddingTop: t.spacing.xxl,
        marginBottom: t.spacing.lg,
    },
    greeting: {
        fontSize: t.fontSize.xxl,
        fontWeight: t.fontWeight.bold,
        color: t.colors.text,
    },
    headerSubtitle: {
        fontSize: t.fontSize.base,
        color: t.colors.textSecondary,
        marginTop: t.spacing.xs,
    },
    flatList: {
        flexGrow: 0,
    },
    slide: {
        width,
        paddingHorizontal: t.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: t.spacing.xxl,
    },
    iconWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: t.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: t.spacing.xl,
        borderWidth: 1,
        borderColor: t.colors.border,
    },
    slideTitle: {
        fontSize: t.fontSize.xl,
        fontWeight: t.fontWeight.bold,
        color: t.colors.text,
        textAlign: 'center',
        marginBottom: t.spacing.sm,
    },
    slideSubtitle: {
        fontSize: t.fontSize.base,
        color: t.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: t.spacing.md,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: t.spacing.lg,
        gap: t.spacing.xs,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: t.colors.border,
    },
    dotActive: {
        width: 24,
        backgroundColor: t.colors.primary,
    },
    button: {
        marginHorizontal: t.spacing.lg,
        backgroundColor: t.colors.primary,
        height: 56,
        borderRadius: t.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: t.colors.textInverse,
        fontWeight: t.fontWeight.bold,
        fontSize: t.fontSize.base,
        letterSpacing: 0.5,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: t.spacing.lg,
        marginTop: t.spacing.sm,
    },
    skipText: {
        fontSize: t.fontSize.base,
        color: t.colors.textSecondary,
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.xs,
    },
    nextText: {
        fontSize: t.fontSize.base,
        fontWeight: t.fontWeight.semibold,
        color: t.colors.primary,
    },
});