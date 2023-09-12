import React, {useContext, useState} from 'react'
import { useNavigation } from '@react-navigation/native'

import {UserContext} from '../../contexts/UserContext'
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
import PersonIcon from '../../assets/person.svg'

const SignUp = () => {

  const {dispatch: userDispatch } = useContext(UserContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignClick = async () => {
    if(name && email && password) {
      let res = await Api.signUp(name, email, password);
      console.log(res);

      if(res.token) {
        await AsyncStorage.setItem('token', res.token)

        userDispatch({
          type: 'SET_AVATAR',
          payload: {
            avatar: res.data.avatar
          }
        });

        navigation.reset({
          routes:[{name: 'MainTab'}]
        })

      } else {
        alert('Erro:' +res.error)
      }

    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes:[{name: 'SignIn'}]
    })
    
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
      <SignInput 
          IconSvg={PersonIcon} 
          placeholder="Digite seu nome"
          value={name}
          onChangeText={text => setName(text)}
        />
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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}

export default SignUp;