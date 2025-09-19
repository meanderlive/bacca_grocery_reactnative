import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
// Or 'react-native-vector-icons/Feather'

const items = [
  {
    id: '1',
    title: 'Pizza Hut',
    rating: 4.3,
    time: '25-30 min',
    img: 'https://source.unsplash.com/100x100/?pizza',
  },
  {
    id: '2',
    title: 'KFC',
    rating: 4.1,
    time: '20-25 min',
    img: 'https://source.unsplash.com/100x100/?kfc',
  },
  {
    id: '3',
    title: 'Burger King',
    rating: 4.5,
    time: '30-35 min',
    img: 'https://source.unsplash.com/100x100/?burger',
  },
];

const MapWithItems = () => {
  return (
    <View style={{ marginHorizontal: 15, marginTop: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Feather name="map-pin" size={18} color="black" />
        <MediumText style={{ fontSize: 16, marginLeft: 5 }}>Map</MediumText>
      </View>

      {/* Map Image */}
      <View style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
        <Image
          source={{ uri: 'https://maps.gstatic.com/tactile/pane/default_geocode-2x.png' }}
          style={{ width: '100%', height: 180 }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            elevation: 3,
          }}>
          <SmallText style={{ fontSize: 12 }}>Live location</SmallText>
        </TouchableOpacity>
      </View>

      {/* Items Scroll List */}
      <FlatList
        horizontal
        data={items}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 15 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              marginRight: 12,
              borderRadius: 10,
              padding: 10,
              width: 160,
              elevation: 3,
            }}>
            <Image
              source={{ uri: item.img }}
              style={{
                width: '100%',
                height: 100,
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <MediumText style={{ fontSize: 14 }}>{item.title}</MediumText>
            <SmallText style={{ color: 'gray', fontSize: 12 }}>
              ⭐ {item.rating} · {item.time}
            </SmallText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MapWithItems;
