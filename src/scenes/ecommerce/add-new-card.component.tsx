import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/ecommerce/add-new-card';

export const AddNewCardScreen = (props): React.ReactElement => {
	console.log(props);
	
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={props.navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Add New Card'
        leftControl={renderBackAction()}
      />
      <Divider/>
      <ContentView {...props}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
