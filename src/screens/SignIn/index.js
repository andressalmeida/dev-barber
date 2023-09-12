import React, {useState, useContext} from 'react'
import {UserContext} from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Container, 
  InputArea, 
  CustomButton, 
  CustomButtonText, 
  SignMessageButton, 
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './styles'
import Api from '../../Api'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

const SignIn = () => {

  const {dispatch: userDispatch } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  const handleSignClick = async () => {
    if(email != '' && password != '') {
      let json = await Api.signIn(email, password)

      if(json.token) {
        await AsyncStorage.setItem('token', json.token)

        userDispatch({
          type: 'SET_AVATAR',
          payload: {
            avatar: json.data.avatar
          }
        });

        navigation.reset({
          routes:[{name: 'MainTab'}]
        })

      } else {
        alert('Email e/ou senha inválidos')
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes:[{name: 'SignUp'}]
    })
    
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite seu email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <SignInput 
          IconSvg={LockIcon} 
          placeholder="Digite sua senha"
          value={password}
          onChangeText={text => setPassword(text)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}

export default SignIn;