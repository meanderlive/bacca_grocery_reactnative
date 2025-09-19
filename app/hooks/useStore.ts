import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { setCurrentStore, clearStoreState } from '../redux/feature/store/storeSlice';
import { Store } from '../../types';

export const useStore = () => {
  const dispatch = useDispatch();
  const { currentStore, loading, error } = useSelector((state: RootState) => state.store);

  /**
   * Set the current active store
   */
  const selectStore = (store: Store | null) => {
    if (!store) {
      dispatch(clearStoreState());
      return;
    }
    
    dispatch(setCurrentStore({
      _id: store._id,
      name: store.name,
      address: store.address,
      logo: store.logo,
      // Add other store properties as needed
    }));
  };

  /**
   * Clear the current store selection
   */
  const clearStore = () => {
    dispatch(clearStoreState());
  };

  return {
    currentStore,
    loading,
    error,
    selectStore,
    clearStore
  };
};

// Example usage in a component:
/*
const StoreSelector = () => {
  const { currentStore, selectStore } = useStore();
  const [stores, setStores] = useState<Store[]>([]);

  // Fetch stores when component mounts
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetchStoresFromAPI(); // Your API call
        setStores(response.data);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <View>
      <Text>Select a Store:</Text>
      <Picker
        selectedValue={currentStore?._id}
        onValueChange={(itemValue) => {
          const selected = stores.find(store => store._id === itemValue);
          selectStore(selected || null);
        }}>
        <Picker.Item label="Select a store..." value={null} />
        {stores.map(store => (
          <Picker.Item key={store._id} label={store.name} value={store._id} />
        ))}
      </Picker>
      {currentStore && (
        <Text>Current Store: {currentStore.name}</Text>
      )}
    </View>
  );
};
*/
