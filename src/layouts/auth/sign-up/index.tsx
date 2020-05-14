import React from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Input, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { EmailIcon, EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon, PersonIcon, PlusIcon, TwitterIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import I18n from '../../../I18n/I18n';
import { signup } from "../../../api/api";
export default ({ navigation }): React.ReactElement => {

  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
	  /*
	  "email": "",
        "password": "",
        "first_name": "",
        "last_name": ""*/ 
	signup({password,email,first_name:userName,last_name:""}).then(res=>{
		console.log(res);
		navigation && navigation.goBack();
	}).catch(error=>{
		console.log(error);
		
	})
    
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Login');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      size='small'
	  icon={PlusIcon}
	  onPress={()=>{
		  
	  }}
    />
  );

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar}
            resizeMode='center'
            source={require('./assets/image-person.png')}
            editButton={renderPhotoButton}
          />
        </View>
        <View style={styles.formContainer}>
          <Input
            status='control'
            autoCapitalize='none'
            placeholder={I18n.t('user_name')}
            icon={PersonIcon}
            value={userName}
            onChangeText={setUserName}
          />
          <Input
            style={styles.formInput}
            status='control'
            autoCapitalize='none'
            placeholder={I18n.t('email')}
            icon={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status='control'
            autoCapitalize='none'
            secureTextEntry={!passwordVisible}
            placeholder={I18n.t('password')}
            icon={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
		  <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
          <CheckBox
            style={styles.termsCheckBox}
            textStyle={styles.termsCheckBoxText}
            checked={termsAccepted}
            onChange={(checked: boolean) => setTermsAccepted(checked)}
          />
		  <Button
          style={styles.signInButton}
          appearance='ghost'
          status='control'
          onPress={onSignInButtonPress}>
         {`${I18n.t('i_read_and_agree')} ${I18n.t('terms_and_conditions')}`}
        </Button>
		</View>
        </View>
        <Button
          style={styles.signUpButton}
          size='giant'
          onPress={onSignUpButtonPress}>
          {I18n.t('sign_up')}
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            {I18n.t('register_using_social')}
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              icon={FacebookIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
              icon={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signInButton}
          appearance='ghost'
          status='control'
          onPress={onSignInButtonPress}>
          {I18n.t('already_have_account')}
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
	
  },
  termsCheckBoxText: {
    color: 'text-control-color',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});

