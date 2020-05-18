import React from 'react';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import {LayoutIcon, BookIcon } from '../../components/icons';
import I18n from '../../I18n/I18n';

export const HomeBottomNavigation = (props): React.ReactElement => {

  const onSelect = (index: number): void => {
	console.log(props.state.routeNames[index]); 
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <SafeAreaLayout insets='bottom'>
      <Divider/>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          title = {I18n.t('main_tab')}
          icon={LayoutIcon}
        />
        <BottomNavigationTab
          title={I18n.t('history_tab')}
          icon={BookIcon}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};
