import {registerSheet} from 'react-native-actions-sheet';

import CameraAndGalleryOption from './CameraAndGalleryOption';
import GenderSelectSheet from './GenderSelectSheet';
import PremiumMembershipSheet from './PremiumMemershiupSheet';
import ItemCustomiseSheet from './ItemCustomiseSheet';

export const SHEETS = {
  CameraAndGalleryOption: 'CameraAndGalleryOption',
  GenderSelectSheet: 'GenderSelectSheet',
  ItemCustomiseSheet: 'ItemCustomiseSheet',
  PremiumMembershipSheet: 'PremiumMembershipSheet',
};

registerSheet(SHEETS.CameraAndGalleryOption, CameraAndGalleryOption);
registerSheet(SHEETS.GenderSelectSheet, GenderSelectSheet);
registerSheet(SHEETS.ItemCustomiseSheet, ItemCustomiseSheet);
registerSheet(SHEETS.PremiumMembershipSheet, PremiumMembershipSheet);
