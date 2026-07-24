import { theme } from 'src/theme';
import { StyleSheet } from 'react-native';

const t = theme;
export const categoryStyles = StyleSheet.create({
  // Sections
  section: { marginBottom: t.spacing.xl },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: t.spacing.md,
  },
  sectionTitle: {
    fontSize: t.fontSize.lg,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
  },
  sectionLink: {
    fontSize: t.fontSize.sm,
    color: t.colors.primary,
    fontWeight: t.fontWeight.semibold,
  },

  // Categories
  categoryChip: {
    alignItems: 'center',
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.lg,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm,
    borderWidth: 1,
    borderColor: t.colors.border,
    gap: 4,
    minWidth: 70,
  },
  categoryEmoji: { fontSize: 24 },
  categoryName: {
    fontSize: t.fontSize.xs,
    fontWeight: t.fontWeight.medium,
    color: t.colors.text,
  },
});

export const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
  },
  greeting: {
    fontSize: t.fontSize.sm,
    color: t.colors.textSecondary,
    fontWeight: t.fontWeight.medium,
  },
  userName: {
    fontSize: t.fontSize.xl,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: t.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: t.colors.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: t.spacing.lg,
    // paddingBottom: t.spacing.xxl,
  },
  searchBar: {
    height: 56,
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  placeholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: theme.colors.textSecondary,
  },

  shortcut: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
  },

  shortcutText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
  },
  // Loading skeletons
  loadingRow: { gap: t.spacing.sm },
  skeletonCard: {
    height: 100,
    backgroundColor: t.colors.border,
    borderRadius: t.radius.lg,
    opacity: 0.5,
  },
});
