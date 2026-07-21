// import { useMenuStore } from '@store/useMenuStore';
// import { useMemo } from 'react';

// function compareSubcategories(a: string, b: string): number {
//   if (a === 'Kachi Dum Biryani') return -1;
//   if (b === 'Kachi Dum Biryani') return 1;
//   return a.localeCompare(b);
// }

// const useFlattenedMenu = () => {
//   const items = useMenuStore((state) => state.items);

//   const flattenedMenu = useMemo(() => {
//     // 1. get unique subcategories

//     const subCategories = [...new Set(items.map((item) => item.subCategory))];

//     // 2. sort them with the pinned rule
//     subCategories.sort(compareSubcategories);

//     // 3. build the flattened array: header, then its items, repeat
//     const result: (
//       { type: 'header'; subCategory: string } | { type: 'item'; data: (typeof items)[0] }
//     )[] = [];

//     subCategories.forEach((subCategory) => {
//       result.push({ type: 'header', subCategory });
//       const itemsInGroup = items.filter((item) => item.subCategory === subCategory);
//       result.push(...itemsInGroup.map((item) => ({ type: 'item' as const, data: item })));
//     });

//     return result;
//   }, [items]);

//   return { flattenedMenu };
// };

// export default useFlattenedMenu;

// //3. This code goes through each category one by one. It places a category header into a list, immediately followed by all the items belonging to that category.

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
