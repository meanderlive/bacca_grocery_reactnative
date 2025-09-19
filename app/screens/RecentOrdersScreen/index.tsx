import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../styles';
import { MediumText, RegularText } from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FastImage from 'react-native-fast-image';

// Placeholder data
type OrderItem = {
  name: string;
  qty: number;
};
type Order = {
  id: string;
  storeLogo: any;
  storeName: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
};

const orders: Order[] = [
  {
    id: '1',
    storeLogo: require('../../../assets/images/ResLogos/img1.png'),
    storeName: 'Fresh Mart',
    orderNumber: '#1001',
    date: '2024-06-01',
    status: 'Delivered',
    total: 24.99,
    items: [
      { name: 'Banana', qty: 2 },
      { name: 'Apple', qty: 1 },
    ],
  },
  {
    id: '2',
    storeLogo: require('../../../assets/images/ResLogos/img2.png'),
    storeName: 'Veggie Hub',
    orderNumber: '#1002',
    date: '2024-05-28',
    status: 'Cancelled',
    total: 12.5,
    items: [
      { name: 'Carrot', qty: 3 },
      { name: 'Broccoli', qty: 1 },
    ],
  },
  {
    id: '3',
    storeLogo: require('../../../assets/images/ResLogos/img3.png'),
    storeName: 'Grocery King',
    orderNumber: '#1003',
    date: '2024-05-20',
    status: 'Delivered',
    total: 45.0,
    items: [
      { name: 'Orange', qty: 5 },
      { name: 'Papaya', qty: 2 },
    ],
  },
];

const RecentOrdersScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order =>
    order.storeName.toLowerCase().includes(search.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.8}
      onPress={() => {/* navigation to order details if needed */ }}
    >
      <View style={styles.orderHeader}>
        <FastImage source={item.storeLogo} style={styles.storeLogo} />
        <View style={styles.orderInfo}>
          <MediumText style={styles.orderStoreName}>{item.storeName}</MediumText>
          <RegularText style={styles.orderNumber}>{item.orderNumber}</RegularText>
        </View>
        <View style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}>
          <RegularText style={styles.statusText}>{item.status}</RegularText>
        </View>
      </View>
      <View style={styles.orderItems}>
        {item.items.map((itm: OrderItem, idx: number) => (
          <RegularText key={idx} style={styles.orderItem}>
            {itm.qty}x {itm.name}
          </RegularText>
        ))}
      </View>
      <View style={styles.orderFooter}>
        <RegularText style={styles.orderDate}>{item.date}</RegularText>
        <MediumText style={styles.orderTotal}>${item.total.toFixed(2)}</MediumText>
      </View>
    </TouchableOpacity>
  );

  function getStatusColor(status: string) {
    switch (status) {
      case 'Delivered':
        return '#E6F9ED';
      case 'Cancelled':
        return '#FFE6E6';
      default:
        return '#F0F0F0';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          {/* <Text style={{fontSize: 24, color: COLORS.black}}>{'←'}</Text> */}
        </TouchableOpacity>
        <MediumText style={styles.headerTitle}>Recent Orders</MediumText>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchBarWrap}>
        <EvilIcons
          name="search"
          size={24}
          color={COLORS.grey}
          style={{ marginRight: 8, marginLeft: 2 }}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by store or order number..."
          placeholderTextColor={COLORS.grey}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<RegularText style={styles.emptyText}>No orders found.</RegularText>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.black,
    // fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    margin: 16,
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    height: 44,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: COLORS.black,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  storeLogo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderStoreName: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 12,
    color: COLORS.grey,
  },
  statusChip: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  orderItems: {
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 13,
    color: COLORS.grey,
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 13,
    color: COLORS.grey,
  },
  orderTotal: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.grey,
    marginTop: 40,
    fontSize: 16,
  },
});

export default RecentOrdersScreen; 