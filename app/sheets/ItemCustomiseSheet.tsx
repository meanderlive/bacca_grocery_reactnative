import {TouchableOpacity } from 'react-native';
import React from 'react';
import ActionSheet, {
  ScrollView,
  SheetManager,
} from 'react-native-actions-sheet';
import {SHEETS} from './sheets';
import {View} from 'react-native';
import {COLORS} from '../styles';
import {MediumText, RegularText, SmallText} from '../components/MyText';
import PrimaryBtn from '../components/PrimaryBtn';

const data = [
  {
    id: 1,
    text: 'Small',
    price: '$20',
  },
  {
    id: 2,
    text: 'Medium',
    price: '$40',
  },
  {
    id: 3,
    text: 'Large',
    price: '$60',
  },
  {
    id: 4,
    text: 'XL',
    price: '$80',
  },
];

const Item = ({
  text,
  onSelect,
  isSelected,
  price,
}: {
  text: string;
  price: string;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        marginBottom: 10,
        backgroundColor: isSelected ? '#FF4C3B' : COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <MediumText style={{color: isSelected ? COLORS.white : COLORS.black}}>
        {text}
      </MediumText>
      <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
        <MediumText style={{color: isSelected ? COLORS.white : 'gray'}}>
          {price}
        </MediumText>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: isSelected ? COLORS.white : COLORS.black,
          }}>
          {isSelected && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: COLORS.white,
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ItemCustomiseSheet = (props: any) => {
  const [selectedId, setSelectedId] = React.useState<null | number>(null);
  const [isSelect, setIsSelect] = React.useState(false);
  const close = () => {
    SheetManager.hide(SHEETS.ItemCustomiseSheet);
  };

  return (
    <ActionSheet
      containerStyle={{
        height: '80%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      id={props.sheetId}
      gestureEnabled>
      <View>
        <MediumText
          style={{
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.05)',
            marginTop: 5,
            marginBottom: 30,
            marginHorizontal: 15,
          }}>
          Customize as per your taste 😋
        </MediumText>
        <ScrollView style={{paddingHorizontal: 15}}>
          <MediumText style={{marginBottom: 10}}>Variation</MediumText>

          {data.map(i => {
            return (
              <Item
                onSelect={() => setSelectedId(i.id)}
                text={i.text}
                price={i.price}
                isSelected={i.id === selectedId}
              />
            );
          })}
          <MediumText style={{marginBottom: 10, marginTop: 15}}>
            Variation
          </MediumText>
          <TouchableOpacity
            onPress={() => setIsSelect(!isSelect)}
            style={{
              marginBottom: 10,
              backgroundColor: isSelect ? '#FF4C3B' : COLORS.white,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: COLORS.black,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <MediumText style={{color: isSelect ? COLORS.white : COLORS.black}}>
              Topping & Cheese
            </MediumText>
            <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
              <MediumText
                style={{color: isSelect ? COLORS.white : COLORS.grey}}>
                $20
              </MediumText>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: isSelect ? COLORS.white : COLORS.black,
                }}>
                {isSelect && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 12,
                      backgroundColor: COLORS.white,
                    }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            marginLeft: 15,
          }}>
          <View style={{width: '35%'}}>
            <MediumText>$60</MediumText>
            <SmallText>Customised Items</SmallText>
          </View>
          <View style={{flex: 1}}>
            <PrimaryBtn
              onPress={() => SheetManager.hide(SHEETS.ItemCustomiseSheet)}
              text="Continue"
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

export default ItemCustomiseSheet;
