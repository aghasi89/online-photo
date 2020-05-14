import React from 'react';
import { ImageStyle } from 'react-native';
import { ThemedIcon } from '../../components/themed-icon.component';
import {
  AssetAutocompleteDarkIcon,
  AssetAutocompleteIcon,
  AssetAvatarDarkIcon,
  AssetAvatarIcon,
  AssetBottomNavigationDarkIcon,
  AssetBottomNavigationIcon,
  AssetButtonDarkIcon,
  AssetButtonGroupDarkIcon,
  AssetButtonGroupIcon,
  AssetButtonIcon,
  AssetCalendarDarkIcon,
  AssetCalendarIcon,
  AssetCardDarkIcon,
  AssetCardIcon,
  AssetCheckBoxDarkIcon,
  AssetCheckBoxIcon,
  AssetDatepickerDarkIcon,
  AssetDatepickerIcon,
  AssetDrawerDarkIcon,
  AssetDrawerIcon,
  AssetIconDarkIcon,
  AssetIconIcon,
  AssetInputDarkIcon,
  AssetInputIcon,
  AssetListDarkIcon,
  AssetListIcon,
  AssetMenuDarkIcon,
  AssetMenuIcon,
  AssetModalDarkIcon,
  AssetModalIcon,
  AssetOverflowMenuDarkIcon,
  AssetOverflowMenuIcon,
  AssetPopoverDarkIcon,
  AssetPopoverIcon,
  AssetRadioDarkIcon,
  AssetRadioIcon,
  AssetSelectDarkIcon,
  AssetSelectIcon,
  AssetSpinnerDarkIcon,
  AssetSpinnerIcon,
  AssetTabViewDarkIcon,
  AssetTabViewIcon,
  AssetTextDarkIcon,
  AssetTextIcon,
  AssetToggleDarkIcon,
  AssetToggleIcon,
  AssetTooltipDarkIcon,
  AssetTooltipIcon,
  AssetTopNavigationDarkIcon,
  AssetTopNavigationIcon,
} from '../../components/icons';
import { MenuItem } from '../../model/menu-item.model';
import I18n from '../../I18n/I18n';

export interface ComponentData extends MenuItem {
  route: string;
}

export const data: ComponentData[] = [
  {
    title: I18n.t('new_order'),
    route: 'NewOrder',
    icon: (style: ImageStyle) => {
      return React.createElement(ThemedIcon, {
        ...style, light: AssetAutocompleteIcon,
        dark: AssetAutocompleteDarkIcon,
      });
    },
  }
];
