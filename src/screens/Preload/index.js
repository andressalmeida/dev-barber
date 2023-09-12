import {useContext, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

import Api from '../../Api'
import * as C from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import BarberLogo from '../../assets/barber.svg'
import { UserContext } from '../../contexts/UserContext'



export default Preload = () => {

const {dispatch: userDispatch } = useContext(UserContext)

const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                let res = await Api.checkToken(token)

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
                    navigation.navigate('SignIn')
                }
            } else {
                navigation.navigate('SignIn')
            }
        }
        
         checkToken();
    }, [])

    return (
        <C.Container>
            <BarberLogo width="100%" height="160"/>
            <C.LoadingIcon size="large" color="#FFFFF" />
        </C.Container>
    )
}