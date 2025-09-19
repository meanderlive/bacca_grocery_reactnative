import React, {useState, useCallback} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../styles';
import MainLayout from '../../components/MainLayout';
import PrimaryBtn from '../../components/PrimaryBtn';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {SheetManager} from 'react-native-actions-sheet';
import {SHEETS} from '../../sheets/sheets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {authSelector, updateUser} from '../../redux/feature/auth/authSlice';
import {api_updateUser, updateProfile, } from '../../api/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { setLocalUser } from '../../utils/helper';
import ProfileUpdateSuccessModal from '../../modals/ProfileUpdateSuccessModal';

interface User {
  _id: string;
  fullname: string;
  email: string;
  contact_number: string;
  dob: string;
  gender: string;
  profileImage?: string;
  token: string;
}

interface FormState {
  fullname: string;
  email: string;
  contact_number: string;
  dob: string;
  gender: string;
}

const DUMMY_IMAGE = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

const EditProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const user = useSelector(authSelector) as User;
  
  // Form state
  const [formState, setFormState] = useState<FormState>({
    fullname: user?.fullname || '',
    email: user?.email || '',
    contact_number: user?.contact_number || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
  });
  
  // UI state
  const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(user?.profileImage || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  
  // Gender options
  const genderOptions = [
    { label: 'Male', value: 'male', icon: 'user' },
    { label: 'Female', value: 'female', icon: 'user' },
    { label: 'Other', value: 'other', icon: 'users' },
  ];
  
  // Derived state
  const hasFormChanges = useCallback(() => {
    return (
      formState.fullname !== user?.fullname ||
      formState.email !== user?.email ||
      formState.contact_number !== user?.contact_number ||
      formState.dob !== user?.dob ||
      formState.gender !== user?.gender ||
      profilePhotoUri !== user?.profileImage
    );
  }, [formState, user, profilePhotoUri]);

  // Form validation
  const validateForm = useCallback((): boolean => {
    const errors: Partial<FormState> = {};
    
    if (!formState.fullname.trim()) {
      errors.fullname = 'Full name is required';
    }
    
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formState.contact_number) {
      errors.contact_number = 'Contact number is required';
    }
    
    if (!formState.dob) {
      errors.dob = 'Date of birth is required';
    }
    
    if (!formState.gender) {
      errors.gender = 'Please select a gender';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);
  
  // Handle form input changes
  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange('dob', formattedDate);
    }
  };

  // Handle image upload
  interface UploadResponse {
    isSuccess: boolean;
    message?: string;
    data?: {
      profileImage?: string;
    };
  }

  const handleImageUpload = async (uri: string): Promise<UploadResponse> => {
    if (!user?._id) {
      throw new Error('User ID is missing');
    }

    if (!uri) return { isSuccess: false };
    
    try {
      // Create a new file-like object with the correct structure
      const file = {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      };
      
      // Create a new FormData object
      const formData = new FormData();
      
      // Append the file with the correct field name 'image' as per the API
      // @ts-ignore - TypeScript doesn't like the File type in React Native
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
      
      // Log the form data structure for debugging
      console.log('FormData contents:', {
        _parts: [
          ['image', {
            uri,
            type: 'image/jpeg',
            name: 'profile.jpg',
          }]
        ]
      });
      
      console.log('Sending request to update profile image...');
      const response = await updateProfile(formData, user._id);
      console.log('Response:', response);
      
      if (response.isSuccess) {
        // The server doesn't return the image URL in the response,
        // so we'll use the local URI for immediate UI update
        const updatedUser = {
          ...user,
          profileImage: uri // Use the local URI for immediate feedback
        };
        
        // Update Redux store
        dispatch(updateUser(updatedUser));
        
        // Update local storage
        try {
          await setLocalUser(updatedUser);
        } catch (storageError) {
          console.warn('Failed to update local storage:', storageError);
        }
        
        return { isSuccess: true };
      }
      
      return { isSuccess: false, message: 'Failed to update profile image' };
    } catch (error) {
      console.error('Error uploading image:', error);
      // Reset to previous image on error
      setProfilePhotoUri(user?.profileImage || DUMMY_IMAGE);
      return { isSuccess: false, message: 'Image upload failed' };
    } finally {
      setIsImageUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user?._id) {
      console.error('User ID is missing');
      return;
    }

    // Validate form
    const errors: Partial<FormState> = {};
    if (!formState.fullname.trim()) errors.fullname = 'Full name is required';
    if (!formState.email.trim()) errors.email = 'Email is required';
    if (!formState.contact_number.trim()) errors.contact_number = 'Phone number is required';
    if (!formState.dob) errors.dob = 'Date of birth is required';
    if (!formState.gender) errors.gender = 'Gender is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare updated user data
      const updatedUserData = {
        fullname: formState.fullname,
        email: formState.email,
        contact_number: formState.contact_number,
        dob: formState.dob ? new Date(formState.dob).toISOString() : null,
        gender: formState.gender,
      };
      
      // Update user data on the server
      const response = await api_updateUser(updatedUserData, user._id);
      
      if (response?.isSuccess) {
        // Update Redux store with new data
        const updatedUser = {
          ...user,
          ...updatedUserData,
          // Keep the existing profile image as it's already updated in handleImagePickerResponse
        };
        
        dispatch(updateUser(updatedUser));
        
        // Update local storage
        try {
          await setLocalUser(updatedUser);
        } catch (storageError) {
          console.warn('Failed to update local storage:', storageError);
        }
        
        // Show success message and navigate back
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.goBack();
        }, 2000);
      } else {
        console.error('Failed to update user:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePickerResponse = async (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    }

    const uri = response.assets?.[0]?.uri;
    if (!uri) return;

    // Show loading state immediately
    setIsImageUploading(true);
    setProfilePhotoUri(uri);

    try {
      // Upload the image immediately
      const uploadResponse = await handleImageUpload(uri);
      
      if (uploadResponse?.isSuccess) {
        // Update the user's profile image in the Redux store
        const updatedUser = {
          ...user,
          profileImage: uploadResponse.data?.profileImage || uri,
        };
        dispatch(updateUser(updatedUser));
        
        // Update local storage
        try {
          await setLocalUser(updatedUser);
        } catch (storageError) {
          console.warn('Failed to update local storage:', storageError);
        }
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      // Revert to previous image if upload fails
      setProfilePhotoUri(user?.profileImage || DUMMY_IMAGE);
    } finally {
      setIsImageUploading(false);
    }
  };

  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        saveToPhotos: false,
      });
      
      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        return;
      }

      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      await handleImagePickerResponse({ ...result, didCancel: false });
    } catch (error) {
      console.error('Error launching camera:', error);
    } finally {
      SheetManager.hide(SHEETS.CameraAndGalleryOption);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        return;
      }

      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      await handleImagePickerResponse({ ...result, didCancel: false });
    } catch (error) {
      console.error('Error launching image library:', error);
    } finally {
      SheetManager.hide(SHEETS.CameraAndGalleryOption);
    }
  };

  const closeSheet = async () => {
    SheetManager.hide(SHEETS.CameraAndGalleryOption);
  };

  const FeatherIcon = Feather as unknown as React.ComponentType<any>;
  const AntDesignIcon = AntDesign as unknown as React.ComponentType<any>;

  return (
    <MainLayout onBack={navigation.goBack} title="Profile Edit">
      <ScrollView contentContainerStyle={{marginHorizontal: 10}}>
        <View
          style={{
            alignItems: 'center',
            width: 100,
            height: 100,
            borderRadius: 100,
            alignSelf: 'center',
            marginBottom: 50,
            marginTop: 10,
          }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              margin: 20,
            }}>
            {profilePhotoUri && profilePhotoUri !== DUMMY_IMAGE ? (
              <Image style={styles.img} source={{uri: profilePhotoUri}} />
            ) : (
              <Image style={styles.img} source={{uri: DUMMY_IMAGE}} />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              SheetManager.show(SHEETS.CameraAndGalleryOption, {
                //@ts-ignore
                payload: {openCamera, openGallery, closeSheet},
              });
            }}
            style={{
              borderRadius: 40,
              height: 35,
              width: 35,
              borderWidth: 2,
              borderColor: 'black',
              backgroundColor: COLORS.primary,
              position: 'absolute',
              top: 95,
              left: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FeatherIcon name="camera" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.input}> 
          <AntDesignIcon
            style={{marginRight: 5}}
            name="user"
            size={20}
            color={COLORS.black}
          />
          <TextInput
            placeholder="Full Name"
            value={formState.fullname}
            onChangeText={(text) => handleInputChange('fullname', text)}
            style={{ flex: 1, color: COLORS.black }}
            placeholderTextColor="#888"
          /> 
        </View>

        <View style={styles.input}>
          <FeatherIcon
            name="mail"
            style={{marginRight: 10}}
            size={20}
            color={COLORS.black}
          />
          <TextInput
            placeholder="Email"
            value={formState.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ flex: 1, color: COLORS.black }}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.input}>
          <FeatherIcon
            name="phone-call"
            style={{marginRight: 10}}
            size={20}
            color={COLORS.black}
          />
          <TextInput
            placeholder="Contact Number"
            value={formState.contact_number}
            onChangeText={(text) => handleInputChange('contact_number', text)}
            keyboardType="phone-pad"
            style={{ flex: 1, color: COLORS.black }}
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <FeatherIcon
            name="calendar"
            style={{marginRight: 10}}
            size={20}
            color={COLORS.black}
          />
          <Text style={{color: formState.dob ? COLORS.black : '#888', flex: 1}}>
            {formState.dob ? new Date(formState.dob).toLocaleDateString() : 'Date of Birth'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formState.dob ? new Date(formState.dob) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity 
          style={[styles.input, !formState.gender && styles.placeholderText]}
          onPress={() => setGenderModalVisible(true)}
        >
          <FeatherIcon
            name="user"
            size={20}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.genderText, !formState.gender && { color: '#999' }]}>
            {formState.gender ? formState.gender.charAt(0).toUpperCase() + formState.gender.slice(1) : 'Select Gender'}
          </Text>
        </TouchableOpacity>
        {formErrors.gender && (
          <Text style={styles.errorText}>{formErrors.gender}</Text>
        )}
        
        {/* Gender Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={genderModalVisible}
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderOption,
                    formState.gender === option.value && styles.selectedGenderOption
                  ]}
                  onPress={() => {
                    handleInputChange('gender', option.value);
                    setGenderModalVisible(false);
                  }}
                >
                  <Feather 
                    name={option.icon as any} 
                    size={20} 
                    color={formState.gender === option.value ? COLORS.primary : '#666'} 
                    style={styles.genderIcon}
                  />
                  <Text style={styles.genderOptionText}>
                    {option.label}
                  </Text>
                  {formState.gender === option.value && (
                    <Feather 
                      name="check" 
                      size={20} 
                      color={COLORS.primary} 
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setGenderModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <PrimaryBtn
          loading={isLoading}
          onPress={handleSubmit}
          text="Update Changes"
          containerStyle={{marginVertical: 50}}
          disabled={!hasFormChanges() || isLoading}
        />
        {isImageUploading && (
          <View style={styles.uploadingOverlay}>
            <View style={styles.uploadingContainer}>
              <Text style={styles.uploadingText}>Uploading image...</Text>
            </View>
          </View>
        )}
        <ProfileUpdateSuccessModal
          visible={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigation.goBack();
          }}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.black,
  },
  genderText: {
    color: COLORS.black,
    fontSize: 16,
  },
  placeholderText: {
    opacity: 0.7,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
  },
  selectedGenderOption: {
    backgroundColor: '#e8f4ff',
    borderWidth: 1,
    borderColor: COLORS.primary + '40',
  },
  genderIcon: {
    marginRight: 15,
  },
  genderOptionText: {
    flex: 1,
    fontSize: 16,
  },
  checkIcon: {
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 20,
    marginTop: -10,
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    paddingLeft: 15,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  uploadingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadingText: {
    marginTop: 10,
    color: COLORS.black,
  },
});