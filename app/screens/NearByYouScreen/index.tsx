import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {RegularText, SmallText} from '../../components/MyText';
import {HomeStackParams, RootStackParams} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {ItemList, foodList} from '../../constants/dummy';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchBar} from 'react-native-screens';

const interests = [
  {id:1,
    name: 'All',
  },
  {id:2,
    name: 'Vegetables',
  },
  {id:3,
    name: 'Fruits',
  },
  {id:4,
    name: 'Dairy & Bakery',
  },
  {id:5,
    name: 'Snacks',
  },
  {id:6,
    name: 'Staples',
  },

  {id:7,
    name: 'Baby Care',
  },
  {id:8,
    name: 'Beverages',
  },
  {id:9,
    name: 'Home Care',
  },
  {id:10,
    name: 'Pet Item',
  },
];

const FoodItem = ({item}: any) => {
  const [isLike, setIsLike] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SingleItem')}
      style={{
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: 15,gap:10
      }}>
      <View
        style={{
          flex: 0.4,
          height: 120,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'grey',borderWidth:2,
        }}>
        <Image
          source={item?.img}
          style={{width: '100%', resizeMode: 'cover', height: '100%'}}
        />
      </View>

      <View
        style={{
          flex: 0.6,
          padding: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <RegularText style={{fontSize: 18}}>{item?.title}</RegularText>

          <AntDesign
            onPress={() => {
              setIsLike(!isLike);
            }}
            name={isLike ? 'heart' : 'hearto'}
            size={20}
            color={'red'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name="star"
              size={15}
              style={{marginHorizontal: 2}}
              color={COLORS.primary}
            />
            <SmallText style={{color: 'grey'}}>{item?.rating}</SmallText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name="clockcircleo"
              size={15}
              style={{marginHorizontal: 2}}
              color={'graya'}
            />
            <SmallText style={{color: 'grey'}}>{item?.away}</SmallText>
          </View>
        </View>
        <SmallText style={{color: 'black'}}>$ {item?.price}</SmallText>
        <SmallText style={{marginTop: 5}}>{item?.shop}</SmallText>
      </View>
    </TouchableOpacity>
  );
};


const ItemRow = ({
  name,
  onSelect,
  isSelected,
}: {
  name: string;
  onSelect: () => void;
  isSelected: boolean;
})=>{
  return(
    <TouchableOpacity 
    style={{height: 50, marginTop:10}}
    onPress={onSelect}>
    <Text
      style={{
        fontSize: 15,
        color: 'black',
        padding: 7,
        paddingHorizontal: 15,
        backgroundColor: isSelected ? COLORS.primary : 'transparent',
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'black',
        margin: 5,
      }}>
     {name}
    </Text>
  </TouchableOpacity>
  )
}


const NearByYouScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [selectedId, setSelectedId] = React.useState<null | number>(1);
  return (
    <MainLayout title="Near By you" onBack={navigation.goBack}>
      <View style={{marginLeft: 0}}>
      <FlatList
        horizontal={true}
        contentContainerStyle={{marginLeft: 5}}
        showsHorizontalScrollIndicator={false}
        data={interests}
        renderItem={({item}) => {
          return (
            <ItemRow
            onSelect={() => setSelectedId(item.id)}
            name={item.name}
            isSelected={item.id === selectedId}
          />
          );
        }}
      />

      <FlatList
        contentContainerStyle={{
          marginRight: 10,
          paddingBottom: 5,
          marginLeft: 15,
        }}
        data={ItemList}
        renderItem={({item}: {item: any}) => {
          return <FoodItem item={item} />;
        }}
      />
      </View>
    </MainLayout>
  );
};

export default NearByYouScreen;
