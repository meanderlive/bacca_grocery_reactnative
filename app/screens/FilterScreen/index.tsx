import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {MediumText, RegularText, SmallText} from '../../components/MyText';
import {COLORS} from '../../styles';
import Slider from '@react-native-community/slider';
import PrimaryBtn from '../../components/PrimaryBtn';

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


const rating = [
  {name: '5'},
  {name: '4'},
  {name: '3'},
  {name: '2'},
  {name: '1'},
];

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



const FilterScreen = () => {
  const [selectedId, setSelectedId] = React.useState<null | number>(1);
  const [selectedRating, setSelectedRating] = React.useState({});
  const [active, setActive] = React.useState(1);
  const [price, setPrice] = React.useState(5);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Filter" onBack={navigation.goBack}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            gap: 10,
            marginVertical: 25,
            alignItems: 'center',
          }}>
          <MediumText>Sort by: </MediumText>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 50,
              height: 40,
              flex: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <RegularText style={{color: 'gray'}}>Popularity</RegularText>
            <AntDesign name={'down'} color={'gray'} size={18} />
          </View>
        </View>
        <MediumText style={{marginLeft: 15, marginBottom: 5}}>
          Category:
        </MediumText>

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

        <MediumText style={{marginLeft: 15, marginTop: 25}}>
          Your Mood:
        </MediumText>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            // justifyContent: 'space-around',
            marginTop: 25,
          }}>
          <TouchableOpacity
            onPress={() => {
              setActive(1);
            }}
            style={{
              height: 35,
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 50,
              width: 80,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active === 1 ? COLORS.primary : 'white',
            }}>
            <RegularText style={{fontSize: 15}}>🥦 Veg</RegularText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActive(2);
            }}
            style={{
              height: 35,
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 50,
              marginHorizontal: 15,
              width: 110,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active === 2 ? COLORS.primary : 'white',
            }}>
            <RegularText style={{fontSize: 15}}>🥩 Non Veg</RegularText>
          </TouchableOpacity>
        </View>

        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15, marginTop: 25
            }}>
        <MediumText style={{}}>Price:</MediumText>
            
            <SmallText style={{fontSize: 12, color: COLORS.grey}}>
             $ {price}
            </SmallText>
          </View>
        <Slider
          style={{
            flex: 1,
            height: 70,
            padding: 10,
          }}
          minimumValue={1}
          maximumValue={1000}
          value={price}
          step={2}
          minimumTrackTintColor={COLORS.black}
          thumbTintColor={COLORS.black}
            onValueChange={v => setPrice(v)}
        />
        <MediumText style={{marginLeft: 15, marginTop: 25, marginBottom: 5}}>
          Rating:
        </MediumText>

        <FlatList
          contentContainerStyle={{
            marginLeft: 10,
            height: 45,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={rating}
          renderItem={({item}) => {
            //@ts-ignore
            const selected = !!selectedRating[item?.name];
            return (
              <TouchableOpacity
                style={{
                  height: 40,
                  flexDirection: 'row',
                  borderRadius: 35,
                  borderWidth: 2,
                  borderColor: 'black',
                  margin: 5,
                  alignItems: 'center',
                  backgroundColor: selected ? COLORS.primary : 'transparent',
                }}
                // key={index}
                onPress={() => {
                  selected
                    ? setSelectedRating({...selectedRating, [item?.name]: ''})
                    : setSelectedRating({
                        ...selectedRating,
                        [item?.name]: item?.name,
                      });
                }}>
                <FontAwesome
                  style={{marginLeft: 15}}
                  name="star"
                  size={15}
                  color={selected ? 'black' : '#FFC107'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    padding: 5,
                    paddingRight: 15,
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <PrimaryBtn
          onPress={() => navigation.goBack()}
          containerStyle={{marginTop: 100}}
          text="Filter"
        />
      </View>
    </MainLayout>
  );
};

export default FilterScreen;
