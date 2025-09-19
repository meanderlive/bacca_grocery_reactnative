import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RecentOrder } from '../types';
import { MediumText, RegularText, SmallText } from './MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface RecentOrdersProps {
  orders: RecentOrder[];
  onOrderPress: (order: RecentOrder) => void;
  onReorderPress: (order: RecentOrder) => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ 
  orders, 
  onOrderPress, 
  onReorderPress 
}) => {
  const renderOrder = ({ item }: { item: RecentOrder }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => onOrderPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.orderHeader}>
        <View style={styles.storeInfo}>
          <FastImage source={item.storeLogo} style={styles.storeLogo} />
          <View style={styles.storeDetails}>
            <RegularText style={styles.storeName}>{item.storeName}</RegularText>
            <SmallText style={styles.orderNumber}>{item.orderNumber}</SmallText>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'completed' ? '#4CAF50' : '#FF9800' }
          ]}>
            <SmallText style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </SmallText>
          </View>
        </View>
      </View>
      
      <View style={styles.orderItems}>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <SmallText key={index} style={styles.itemText}>
            {orderItem.quantity}x {orderItem.productName}
          </SmallText>
        ))}
        {item.items.length > 2 && (
          <SmallText style={styles.moreItems}>
            +{item.items.length - 2} more items
          </SmallText>
        )}
      </View>
      
      <View style={styles.orderFooter}>
        <View style={styles.orderInfo}>
          <SmallText style={styles.orderDate}>{item.orderDate}</SmallText>
          <SmallText style={styles.pickupTime}>Pickup: {item.pickupTime}</SmallText>
        </View>
        <View style={styles.orderActions}>
          <MediumText style={styles.totalAmount}>
            ${item.totalAmount.toFixed(2)}
          </MediumText>
          <TouchableOpacity
            style={styles.reorderButton}
            onPress={() => onReorderPress(item)}
          >
            <SmallText style={styles.reorderText}>Reorder</SmallText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MediumText style={styles.title}>Recent Orders 📦</MediumText>
        <TouchableOpacity style={styles.viewAllButton}>
          <RegularText style={styles.viewAllText}>View all</RegularText>
          <AntDesign name="right" size={12} color="#666" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#666',
    marginRight: 5,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  orderCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  pickupTime: {
    fontSize: 11,
    color: '#666',
  },
  orderActions: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  reorderButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reorderText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default RecentOrders; 