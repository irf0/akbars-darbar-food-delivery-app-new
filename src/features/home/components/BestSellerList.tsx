import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import useBestSellers from '@hooks/useBestSellers';
import { MenuItem } from '@types';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { getDisplayPrice } from '@utils/getDisplayPrice';
import { DietBadge } from 'src/global/components/DietBadge';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { useCartStore } from '@store/useCartStore';

interface Props {
  onItemPress: (item: MenuItem) => void;
}

const BestSellerList = ({ onItemPress }: Props) => {
  const { bestSellers } = useBestSellers();
  const { orderType } = useOrderTypeStore();
  const openModal = usePortionSelectorStore((state) => state.openModal);
  const { addItem } = useCartStore();

  const handleAddBtn = (item: MenuItem) => {
    const halfPrice =
      orderType === 'delivery' ? item.half_delivery_price : item.half_takeaway_price;

    if (halfPrice === 0) {
      addItem(item, 'full', 1);
    } else {
      openModal(item);
    }
  };
  return (
    <View>
      <Text>BestSeller List</Text>
      <View>
        {/* image
                dietBadge
                name
                price */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={bestSellers}
          keyExtractor={(i) => i?.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View>
              <Pressable onPress={() => onItemPress(item)}>
                <Image
                  cachePolicy={'memory-disk'}
                  source={{ uri: item?.image }}
                  contentFit="cover"
                  style={{ width: 140, height: 140, borderRadius: 12 }}
                />
                <DietBadge type={item.item_type} />
                <Text>{item?.name}</Text>
                <Text>₹{getDisplayPrice(item, orderType)}</Text>
              </Pressable>
              <TouchableOpacity
                style={{ padding: 20, backgroundColor: 'red' }}
                onPress={() => handleAddBtn(item)}>
                <Text>ADD</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BestSellerList;
