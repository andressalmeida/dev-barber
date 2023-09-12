
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,

} from './styles'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location';


const Home = () => {
    const navigation = useNavigation();

    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState(null);

    const handleLocationFinder = async () => {
        setCoords(null);

              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
              }
        
              let info = await Location.getCurrentPositionAsync({});
              setCoords(info.coords)

              console.log(coords)
    }


    return (
           <Container>
        <Scroller>
            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                <SearchButton onPress={() => navigation.navigate('Search')}>
                    <SearchIcon width="26" height="26" fill="#fff"/>
                </SearchButton>
            </HeaderArea>

            <LocationArea>
                <LocationInput 
                placeholder="Onde você está?"
                placeholderTextColor="#FFF"
                value={location}
                onChangeText={t => setLocation(t)}
                />
                <LocationFinder onPress={handleLocationFinder}>
                    <MyLocationIcon width="24" height="24" fill="#fff"/> 
                </LocationFinder>
            </LocationArea>
        </Scroller>
    </Container>
    )
}

export default Home;

