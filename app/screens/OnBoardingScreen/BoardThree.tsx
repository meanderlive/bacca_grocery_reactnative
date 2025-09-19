// import {View, Text, Dimensions, Image, ScrollView} from 'react-native';
// import React from 'react';
// import {BigText, RegularText} from '../../components/MyText';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParams} from '../../navigation/types';
// import {TouchableOpacity} from 'react-native';
// import {COLORS} from '../../styles';
// import PrimaryBtn from '../../components/PrimaryBtn';
// import ImageThree from '../../../assets/images/svg/OnBoardingThree.svg';

// const {width} = Dimensions.get('window');
// type Props = {
//   handleSkip?: () => void;
//   handleNext?: () => void;
// };
// const BoardThree = ({}: Props) => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParams>>();

//   function handleNext() {
//     navigation.navigate('Login');
//   }
//   return (
//     <View
//       style={{
//         width: width,
//         backgroundColor: 'white',
//         flex: 1,
//       }}>
//       <View
//         style={{
//           width: '100%',
//           height: '50%',
//           marginTop: 25,
//           alignItems: 'center',
//         }}>
//         <ImageThree width={'90%'} />
//       </View>
//       <BigText style={{textAlign: 'center', marginBottom: 10, marginTop: 80}}>
//         Deliver to Doorstep
//       </BigText>

//       <RegularText
//         style={{
//           textAlign: 'center',
//           color: 'grey',
//           marginHorizontal: 30,
//         }}>
//         Choose to be delivery or pickup according to when you  need
//       </RegularText>

//     </View>
//   );
// };

// export default BoardThree;
import {View, Text, Dimensions, Image, ScrollView} from 'react-native';
import React from 'react';
import {BigText, RegularText} from '../../components/MyText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../styles';
import PrimaryBtn from '../../components/PrimaryBtn';
import ImageThree from '../../../assets/images/svg/OnBoardingThree.svg';

const {width} = Dimensions.get('window');
type Props = {
  handleSkip?: () => void;
  handleNext?: () => void;
};

const BoardThree = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  function handleNext() {
    navigation.navigate('Login'); // Navigate to store selection
  }

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
          alignItems: 'center',
        }}>
        <ImageThree width={'90%'} />
      </View>
      <BigText style={{textAlign: 'center', marginBottom: 10, marginTop: 80}}>
        Pick Up Your Groceries
      </BigText>

      <RegularText
        style={{
          textAlign: 'center',
          color: 'grey',
          marginHorizontal: 30,
        }}>
        Choose your preferred store, schedule a pickup time, and collect your order
        directly from the store at your convenience.
      </RegularText>

     
    </View>
  );
};

export default BoardThree;
