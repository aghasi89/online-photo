import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentsScreen } from '../scenes/components/components.component';
import { AutocompleteScreen } from '../scenes/components/autocomplete/autocomplete.component';
import { AvatarScreen } from '../scenes/components/avatar/avatar.component';
import { BottomNavigationScreen } from '../scenes/components/bottom-navigation/bottom-navigation.component';
import { ButtonScreen } from '../scenes/components/button/button.component';
import { ButtonGroupScreen } from '../scenes/components/button-group/button-group.component';
import { CalendarScreen } from '../scenes/components/calendar/calendar.component';
import { CardScreen } from '../scenes/components/card/card.component';
import { CheckBoxScreen } from '../scenes/components/checkbox/checkbox.component';
import { DatepickerScreen } from '../scenes/components/datepicker/datepicker.component';
import { DrawerScreen } from '../scenes/components/drawer/drawer.component';
import { IconScreen } from '../scenes/components/icon/icon.component';
import { InputScreen } from '../scenes/components/input/input.component';
import { LayoutScreen } from '../scenes/components/layout/layout.component';
import { ListScreen } from '../scenes/components/list/list.component';
import { MenuScreen } from '../scenes/components/menu/menu.component';
import { ModalScreen } from '../scenes/components/modal/modal.component';
import { OverflowMenuScreen } from '../scenes/components/overflow-menu/overflow-menu.component';
import { PopoverScreen } from '../scenes/components/popover/popover.component';
import { RadioScreen } from '../scenes/components/radio/radio.component';
import { RadioGroupScreen } from '../scenes/components/radio-group/radio-group.component';
import { RangeCalendarScreen } from '../scenes/components/range-calendar/range-calendar.component';
import { RangeDatepickerScreen } from '../scenes/components/range-datepicker/range-datepicker.component';
import { SelectScreen } from '../scenes/components/select/select.component';
import { SpinnerScreen } from '../scenes/components/spinner/spinner.component';
import { TabViewScreen } from '../scenes/components/tab-view/tab-view.component';
import { TextScreen } from '../scenes/components/text/text.component';
import { ToggleScreen } from '../scenes/components/toggle/toggle.component';
import { TooltipScreen } from '../scenes/components/tooltip/tooltip.component';
import { TopNavigationScreen } from '../scenes/components/top-navigation/top-navigation.component';
import { ShoppingCartScreen } from '../scenes/ecommerce/shopping-cart.component';
import { AddNewCardScreen } from '../scenes/ecommerce/add-new-card.component';
import I18n from '../I18n/I18n';

const Stack = createStackNavigator();

export const ComponentsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Services' component={ComponentsScreen}/>
    <Stack.Screen name='NewOrder' component={ShoppingCartScreen}/>
	<Stack.Screen name='SelectAddress' component={AddNewCardScreen}/>

  </Stack.Navigator>
);
