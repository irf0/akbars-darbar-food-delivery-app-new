import { MenuItem, MenuSection } from '@types';

type HeaderRow = { type: 'header'; title: string; category: string; count: number };
type ItemRow = { type: 'item'; item: MenuItem };
export type FlatRow = HeaderRow | ItemRow;

export function flattenSections(sections: MenuSection[]): FlatRow[] {
  return sections.flatMap((section) => [
    {
      type: 'header',
      title: section.title,
      category: section.category,
      count: section.data.length,
    } as HeaderRow,
    ...section.data.map((item) => ({ type: 'item', item }) as ItemRow),
  ]);
}
