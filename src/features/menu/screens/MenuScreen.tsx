// import React from 'react'
// import { View, Text, SectionList, ActivityIndicator, SafeAreaView } from 'react-native'
// import { useMenuData } from '../hooks/useMenuData'
// import MenuItemCard from '../components/MenuItemCard'

// export const MenuScreen = () => {
//   const { sections, isLoading, isRefreshing, onRefresh } = useMenuData()

//   if (isLoading) {
//     return (
//       <SafeAreaView>
//         <ActivityIndicator />
//       </SafeAreaView>
//     )
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <SectionList
//         sections={sections}
//         keyExtractor={item => item.id}
//         refreshing={isRefreshing}
//         onRefresh={onRefresh}

//         renderItem={({ item }) => (
//           <MenuItemCard orderType='delivery' item={item} onAddPress={() => { '' }} />
//         )}
//       />
//     </SafeAreaView>
//   )
// }