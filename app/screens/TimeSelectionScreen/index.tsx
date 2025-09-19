import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { COLORS } from '../../styles';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { setScheduledTime } from '../../redux/feature/cart/cartSlice';

const { width } = Dimensions.get('window');

const TimeSelectionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  
  const itemsByStore = useSelector((state: RootState) => state.cart.itemsByStore);
  const storeGroups = Object.values(itemsByStore);

  // Move all hooks here, even if cart is empty
  const isMultiStore = storeGroups.length > 1;
  const [storeSelections, setStoreSelections] = useState<{ [storeId: string]: { option: 'immediate' | 'scheduled', timeSlot?: string } }>(() => {
    const initial: any = {};
    storeGroups.forEach(group => {
      initial[group.storeId] = { option: 'immediate', timeSlot: '' };
    });
    return initial;
  });
  const [selectedOption, setSelectedOption] = useState<'immediate' | 'scheduled'>('immediate');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Early return for empty cart or undefined group (after all hooks)
  if (!storeGroups.length || !storeGroups[0]) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MediumText>No store found in cart.</MediumText>
      </View>
    );
  }
  
  const handleStoreOptionChange = (storeId: string, option: 'immediate' | 'scheduled') => {
    setStoreSelections(prev => ({
      ...prev,
      [storeId]: { ...prev[storeId], option }
    }));
  };
  
  const handleStoreTimeSlot = (storeId: string, timeSlot: string) => {
    setStoreSelections(prev => ({
      ...prev,
      [storeId]: { ...prev[storeId], timeSlot }
    }));
  };

  const handleContinue = () => {
    if (isMultiStore) {
      for (const group of storeGroups) {
        const sel = storeSelections[group.storeId];
        if (!sel) continue;
        if (sel.option === 'scheduled' && !sel.timeSlot) {
          Alert.alert('Select Time', `Please select a pickup time slot for ${group.storeName}.`);
          return;
        }
        dispatch(setScheduledTime({ storeId: group.storeId, scheduledTime: sel.option === 'immediate' ? 'Immediate' : sel.timeSlot! }));
      }
      navigation.navigate('Checkout', { slots: storeSelections } as any);
    } else {
      if (selectedOption === 'scheduled' && !selectedTimeSlot) {
        Alert.alert('Select Time', 'Please select a pickup time slot.');
        return;
      }
      const group = storeGroups[0];
      dispatch(setScheduledTime({ storeId: group.storeId, scheduledTime: selectedOption === 'immediate' ? 'Immediate' : selectedTimeSlot }));
      navigation.navigate('Checkout', { slot: selectedOption === 'immediate' ? 'Immediate' : selectedTimeSlot } as any);
    }
  };

  const timeSlots = [
    { id: '1', time: '10:00 AM - 11:00 AM', available: true },
    { id: '2', time: '11:00 AM - 12:00 PM', available: true },
    { id: '3', time: '12:00 PM - 1:00 PM', available: false },
    { id: '4', time: '1:00 PM - 2:00 PM', available: true },
    { id: '5', time: '2:00 PM - 3:00 PM', available: true },
    { id: '6', time: '3:00 PM - 4:00 PM', available: true },
    { id: '7', time: '4:00 PM - 5:00 PM', available: false },
    { id: '8', time: '5:00 PM - 6:00 PM', available: true },
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const renderStoreGroup = (group: any) => (
    <View key={group.storeId} style={styles.storeGroupContainer}>
      {/* Store Header */}
      <View style={styles.storeHeader}>
        <MediumText style={styles.storeName}>{group.storeName}</MediumText>
        <View style={styles.itemCountBadge}>
          <SmallText style={styles.itemCountText}>{group.items.length} item{group.items.length !== 1 ? 's' : ''}</SmallText>
        </View>
      </View>
      
      {/* Items Preview */}
      <View style={styles.itemsList}>
        {group.items.slice(0, 3).map((item: any) => (
          <RegularText key={item.productId} style={styles.itemText}>
            • {item.product.name} ×{item.quantity}
          </RegularText>
        ))}
        {group.items.length > 3 && (
          <RegularText style={styles.moreItemsText}>
            +{group.items.length - 3} more item{group.items.length - 3 !== 1 ? 's' : ''}
          </RegularText>
        )}
      </View>
      {/* Store Information (static for now) */}
      <View style={styles.storeInfoContainer}>
        <MediumText style={styles.storeInfoTitle}>Store Information</MediumText>
        <View style={styles.storeCardEnhanced}>
          <View style={styles.storeIconEnhanced}>
            <Feather name="map-pin" size={18} color={COLORS.primary} />
          </View>
          <View style={styles.storeDetailsEnhanced}>
            <MediumText style={styles.storeNameEnhanced}>{group.storeName}</MediumText>
            <RegularText style={styles.storeAddressEnhanced}>
              123 Main Street, Downtown
            </RegularText>
            <RegularText style={styles.storeHoursEnhanced}>
              Open: 8:00 AM - 8:00 PM
            </RegularText>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
      
      {/* Pickup Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionCard,
            isMultiStore 
              ? storeSelections[group.storeId]?.option === 'immediate' && styles.selectedOption
              : selectedOption === 'immediate' && styles.selectedOption,
          ]}
          onPress={() => isMultiStore 
            ? handleStoreOptionChange(group.storeId, 'immediate')
            : setSelectedOption('immediate')
          }
          activeOpacity={0.8}
        >
          <View style={styles.optionHeader}>
            <View style={[
              styles.optionIcon,
              (isMultiStore 
                ? storeSelections[group.storeId]?.option === 'immediate'
                : selectedOption === 'immediate') && styles.selectedOptionIcon
            ]}>
              <Feather name="clock" size={20} color={
                (isMultiStore 
                  ? storeSelections[group.storeId]?.option === 'immediate'
                  : selectedOption === 'immediate') ? COLORS.white : COLORS.primary
              } />
            </View>
            <MediumText style={styles.optionTitle}>Immediate Pickup</MediumText>
          </View>
          <RegularText style={styles.optionDescription}>
            Ready in 15-20 minutes
          </RegularText>
          {(isMultiStore 
            ? storeSelections[group.storeId]?.option === 'immediate'
            : selectedOption === 'immediate') && (
            <View style={styles.selectedBadge}>
              <AntDesign name="check" size={14} color={COLORS.white} />
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.optionCard,
            isMultiStore 
              ? storeSelections[group.storeId]?.option === 'scheduled' && styles.selectedOption
              : selectedOption === 'scheduled' && styles.selectedOption,
          ]}
          onPress={() => isMultiStore 
            ? handleStoreOptionChange(group.storeId, 'scheduled')
            : setSelectedOption('scheduled')
          }
          activeOpacity={0.8}
        >
          <View style={styles.optionHeader}>
            <View style={[
              styles.optionIcon,
              (isMultiStore 
                ? storeSelections[group.storeId]?.option === 'scheduled'
                : selectedOption === 'scheduled') && styles.selectedOptionIcon
            ]}>
              <Feather name="calendar" size={20} color={
                (isMultiStore 
                  ? storeSelections[group.storeId]?.option === 'scheduled'
                  : selectedOption === 'scheduled') ? COLORS.white : COLORS.primary
              } />
            </View>
            <MediumText style={styles.optionTitle}>Scheduled Pickup</MediumText>
          </View>
          <RegularText style={styles.optionDescription}>
            Choose your preferred time
          </RegularText>
          {(isMultiStore 
            ? storeSelections[group.storeId]?.option === 'scheduled'
            : selectedOption === 'scheduled') && (
            <View style={styles.selectedBadge}>
              <AntDesign name="check" size={14} color={COLORS.white} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Time Slots */}
      {(isMultiStore 
        ? storeSelections[group.storeId]?.option === 'scheduled'
        : selectedOption === 'scheduled') && (
        <View style={styles.timeSlotsSection}>
          <MediumText style={styles.sectionSubtitle}>Available Time Slots</MediumText>
          <RegularText style={styles.dateText}>{formattedDate}</RegularText>
          <View style={styles.timeSlotsGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlotCard,
                  !slot.available && styles.unavailableTimeSlot,
                  (isMultiStore 
                    ? storeSelections[group.storeId]?.timeSlot === slot.time
                    : selectedTimeSlot === slot.time) && styles.selectedTimeSlot
                ]}
                onPress={() => slot.available && (isMultiStore 
                  ? handleStoreTimeSlot(group.storeId, slot.time)
                  : setSelectedTimeSlot(slot.time)
                )}
                disabled={!slot.available}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.timeSlotText,
                  !slot.available && styles.unavailableTimeSlotText,
                  (isMultiStore 
                    ? storeSelections[group.storeId]?.timeSlot === slot.time
                    : selectedTimeSlot === slot.time) && styles.selectedTimeSlotText
                ]}>
                  {slot.time}
                </Text>
                {!slot.available && (
                  <View style={styles.unavailableBadge}>
                    <SmallText style={styles.unavailableText}>Full</SmallText>
                  </View>
                )}
                {(isMultiStore 
                  ? storeSelections[group.storeId]?.timeSlot === slot.time
                  : selectedTimeSlot === slot.time) && (
                  <View style={styles.timeSlotCheck}>
                    <AntDesign name="check" size={14} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <AntDesign name="arrowleft" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <MediumText style={styles.headerTitle}>Pickup Time</MediumText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Content */}
        <View style={styles.section}>
          {isMultiStore ? (
            <>
              <MediumText style={styles.sectionTitle}>Schedule Pickup for Each Store</MediumText>
              {storeGroups.map(renderStoreGroup)}
            </>
          ) : (
            <>
              <MediumText style={styles.sectionTitle}>Choose Pickup Option</MediumText>
              {renderStoreGroup(storeGroups[0])}
              
              {/* Store Information */}
              <View style={styles.storeInfoContainer}>

                <MediumText style={styles.sectionSubtitle}>Store Information</MediumText>
                <View style={styles.storeCardEnhanced}>
                  <View style={styles.storeIconEnhanced}>
                    <Feather name="map-pin" size={18} color={COLORS.primary} />
                  </View>
                  <View style={styles.storeDetailsEnhanced}>
                    <MediumText style={styles.storeNameEnhanced}>{storeGroups[0].storeName}</MediumText>
                    <RegularText style={styles.storeAddressEnhanced}>
                      123 Main Street, Downtown
                    </RegularText>
                    <RegularText style={styles.storeHoursEnhanced}>
                      Open: 8:00 AM - 8:00 PM
                    </RegularText>
                  </View>
                </View>
                <View style={styles.divider} />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <MediumText style={styles.continueText}>
            Continue to Checkout
          </MediumText>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 16,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 12,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 16,
  },
  storeGroupContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    paddingBottom: 20,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  itemCountBadge: {
    backgroundColor: '#FFF9E3',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  itemCountText: {
    fontSize: 12,
    color: COLORS.grey,
  },
  itemsList: {
    marginBottom: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 12,
  },
  itemText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  moreItemsText: {
    color: COLORS.primary,
    fontSize: 13,
    marginTop: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#FFF9E3',
    borderColor: COLORS.primary,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flex: 1,
    minWidth: 0, // This is important for text truncation
  },
  optionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOptionIcon: {
    backgroundColor: COLORS.primary,
  },
  optionTitle: {
    fontSize: 14, // Slightly smaller font
    color: COLORS.black,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  optionDescription: {
    fontSize: 13,
    color: COLORS.grey,
    lineHeight: 18,
  },
  selectedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotsSection: {
    marginTop: 16,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotCard: {
    width: '48%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  selectedTimeSlot: {
    backgroundColor: '#FFF9E3',
    borderColor: COLORS.primary,
  },
  unavailableTimeSlot: {
    backgroundColor: '#f9f9f9',
    borderColor: '#f0f0f0',
  },
  timeSlotText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedTimeSlotText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  unavailableTimeSlotText: {
    color: '#ccc',
  },
  unavailableBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unavailableText: {
    fontSize: 10,
    color: COLORS.grey,
  },
  timeSlotCheck: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfoContainer: {
    marginTop: 16,
  },
  storeInfoTitle: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 2,
    letterSpacing: 0.2,
  },
  storeCardEnhanced: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  storeIconEnhanced: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  storeDetailsEnhanced: {
    flex: 1,
  },
  storeNameEnhanced: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 2,
  },
  storeAddressEnhanced: {
    fontSize: 13,
    color: COLORS.grey,
    marginBottom: 1,
  },
  storeHoursEnhanced: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
    borderRadius: 1,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TimeSelectionScreen;