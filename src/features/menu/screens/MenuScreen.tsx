import { FlashList } from '@shopify/flash-list';
import { Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import useFlattenedMenu from '@features/menu/hooks/useFlattenedMenu';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { getDisplayPrice } from '@utils/getDisplayPrice';
import { Image } from 'expo-image';
import { DietBadge } from 'src/global/components/DietBadge';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { MenuItem } from '@types';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, BottomTabsParamList } from '@navigation/types';
import { useCartStore } from '@store/useCartStore';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Menu'>,
  NativeStackScreenProps<AppStackParamList>
>;

const MenuScreen = ({ navigation, route }: Props) => {
  const { flattenedMenu } = useFlattenedMenu();
  const orderType = useOrderTypeStore((state) => state.orderType);
  const openModal = usePortionSelectorStore((state) => state.openModal);
  const { addItem } = useCartStore();

  //check if half is available
  const handleAddBtn = (item: MenuItem) => {
    const halfPrice = orderType === 'delivery' ? item.base_half_price : item.base_full_price;

    if (halfPrice === 0) {
      addItem(item, 'full', 1);
    } else {
      openModal(item);
    }
  };

  return (
    <FlashList
      data={flattenedMenu}
      keyExtractor={(item) => (item.type === 'header' ? item.subCategory : item.data.id)}
      getItemType={(item) => item.type}
      renderItem={({ item }) => {
        if (item.type === 'header') {
          return <Text>{item.subCategory}</Text>;
        }
        return (
          <>
            <Pressable onPress={() => navigation.navigate('MenuDetail', { item: item.data })}>
              <Image
                cachePolicy="disk"
                source={{ uri: item.data.image }}
                style={[styles.itemImage, { backgroundColor: '#ced0d3' }]}
                contentFit="cover"
                recyclingKey={item.data.image}
                transition={150}
              />

              <DietBadge type={item.data.item_type} />
              <Text>{item.data.name}</Text>
              <Text>{getDisplayPrice(item.data, orderType)}</Text>
            </Pressable>
            <TouchableOpacity
              style={{ padding: 20, backgroundColor: 'red' }}
              onPress={() => handleAddBtn(item.data)}>
              <Text>ADD</Text>
            </TouchableOpacity>
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerRow: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MenuScreen;
