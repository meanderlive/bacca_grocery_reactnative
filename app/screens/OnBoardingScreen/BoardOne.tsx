import {
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {BigText, RegularText} from '../../components/MyText';
import ImageOne from '../../../assets/images/svg/OnBoardingOne.svg';

const {width} = Dimensions.get('window');

type Props = {
  handleSkip: () => void;
  handleNext: () => void;
};

const BoardOne = ({handleSkip, handleNext}: Props) => {
  return (
    <View
      style={{
        width: width,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          width: '100%', 
          height: '50%',
          marginTop: 25,
          alignItems: 'center',justifyContent:'flex-end'
        }}>
        <ImageOne />
      </View>
      <BigText style={{textAlign: 'center', marginBottom: 10, marginTop: 80}}>
        Find Nearby Store 
      </BigText>

      <RegularText
        style={{
          textAlign: 'center',
          color: 'grey',
          marginHorizontal: 20,
        }}>
        Find the favourotes stores you want by your locations or neighborhood
      </RegularText>

    </View>
  );
};

export default BoardOne;
