import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home';
import Appointments from '../Appointments';
import Favorites from '../Favorites';
import Profile from '../Profile';
import Search from '../Search';
import CustomTabBar from '../../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const MainTab = () => {
        return (
            <Tab.Navigator 
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false
            }}>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Search" component={Search} />
              <Tab.Screen name="Appointments" component={Appointments} />
              <Tab.Screen name="Favorites" component={Favorites} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          )  
}

export default MainTab;