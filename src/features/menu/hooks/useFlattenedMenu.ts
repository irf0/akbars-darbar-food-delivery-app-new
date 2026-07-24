import { useMenuStore } from '@store/useMenuStore';
import { useMemo } from 'react';

function compareSubcategories(a: string, b: string): number {
  if (a === 'Kachi Dum Biryani') return -1;
  if (b === 'Kachi Dum Biryani') return 1;
  return a.localeCompare(b);
}

const useFlattenedMenu = (category?: string) => {
  const items = useMenuStore((state) => state.items);

  const flattenedMenu = useMemo(() => {
    const filteredItems = category
      ? items.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      : items;

    const subCategories = [...new Set(filteredItems.map((item) => item.subCategory))];
    subCategories.sort(compareSubcategories);

    const result: (
      { type: 'header'; subCategory: string } | { type: 'item'; data: (typeof items)[0] }
    )[] = [];

    subCategories.forEach((subCategory) => {
      result.push({ type: 'header', subCategory });
      const itemsInGroup = filteredItems.filter((item) => item.subCategory === subCategory);
      result.push(...itemsInGroup.map((item) => ({ type: 'item' as const, data: item })));
    });

    return result;
  }, [items, category]);

  return { flattenedMenu };
};

export default useFlattenedMenu;
