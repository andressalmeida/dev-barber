
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea

} from './styles'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import Api from '../../Api'
import BarberItem from '../../components/BarberItem'


const Home = () => {
    const navigation = useNavigation();

    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    const handleLocationFinder = async () => {
        setCoords(null);

        setLoading(true);
        setLocation('');
        setList([])

              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
              }
        
              let info = await Location.getCurrentPositionAsync({});
              setCoords(info.coords)
              getBarbers();

              console.log(coords)
    }

    const getBarbers = async () => {
        setLoading(true)
        setList([])

        let res = await Api.getBarbers()

        if(res.error === '') {
            if(res.loc) {
                setLocation(res.loc)
            }

            setList(res.data)
        } else {
            alert('Error: ' + res.error)
        }

        setLoading(false)
    }

    useEffect(() => {
        getBarbers();
    }, [])

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

            {loading &&
                <LoadingIcon size='large' color="#FFF" />
            }

            <ListArea>
                {list.map((item, k) => (
                    <BarberItem key={k} data={item} />
                ))}
            </ListArea>
        </Scroller>
    </Container>
    )
}

export default Home;

