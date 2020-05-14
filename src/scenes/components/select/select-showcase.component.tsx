import React from 'react';
import { StyleSheet } from 'react-native';
import { Select, SelectElement, SelectProps } from '@ui-kitten/components';
import I18n from '../../../I18n/I18n';

export const SelectShowcase = (props: SelectProps): SelectElement => {

  const [selectedOption, setSelectedOption] = React.useState(props.selectedOption);

  const onSelect = (option) => {
	setSelectedOption(option);
	props.onSelect(option)
  };

  return (
    <Select
	
	  {...props}
	  placeholder={I18n.t('select')}
	  style={[styles.select,props.style]}
      selectedOption={props.selectedOption}
      onSelect={onSelect}
    />
  );
};

const styles = StyleSheet.create({
  select: {
    width: 200,
  },
});
