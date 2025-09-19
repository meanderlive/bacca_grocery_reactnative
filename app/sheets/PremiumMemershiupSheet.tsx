import { View, StyleSheet } from 'react-native';
import React from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { SHEETS } from './sheets';
import { MediumText, RegularText, SmallText10Black } from '../components/MyText';
import PrimaryBtn from '../components/PrimaryBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';


const PremiumMembershipSheet = (props: any) => {
  const close = () => {
    SheetManager.hide(SHEETS.PremiumMembershipSheet);
  };

  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}
      id={props.sheetId} gestureEnabled>
      <View style={{ height: 300, padding: 20, }}>
        <View style={{ flexDirection: 'row' }}>
          <MediumText>Special Prices only for you</MediumText>
        </View>
        <View style={styles.container}>
          <View style={{gap:5}}>
            <RegularText>3 months</RegularText>
            <View style={{ flexDirection: 'row',gap:10 }}>
            <MediumText>$299</MediumText>
            <MediumText style={{color:'gray',textDecorationLine:'line-through'}}>$999</MediumText>
          </View>
          </View>
          <AntDesign name="checkcircle" size={24} color="#FF5858" />
        </View>

        <PrimaryBtn
       onPress={close} 
       text="Buy Premium at $299"
        textStyle={{marginTop:-10}}/>
      <SmallText10Black style={{textAlign: 'center', marginTop: -25}}>
        for 3 months
      </SmallText10Black>
      </View>
    </ActionSheet>
  );
};

export default PremiumMembershipSheet;

const styles = StyleSheet.create(
  {
    container: {
      flexDirection: 'row',
      borderRadius: 20,
      padding:15,
      borderWidth:2,
      borderColor:'#FF5858',
      marginVertical:20,
      alignItems:'center',
      justifyContent:'space-between',paddingVertical:25
    }
  }
)