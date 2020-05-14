import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, SearchIcon } from '../../components/icons';
import ContentView from '../../layouts/ecommerce/shopping-cart';
import I18n from '../../I18n/I18n';

export const ShoppingCartScreen = ({ navigation }): React.ReactElement => {

 

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

 

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title={I18n.t('new_order')}
        leftControl={renderBackAction()}
      />
      <ContentView {...navigation}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
