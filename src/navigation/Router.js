import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstRegister from '../screens/FirstRegister';
import SecondRegister from '../screens/SecondRegister';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import LandingScreen from '../screens/LandingScreen';
import { connect } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';
import SpotScreen from '../screens/SpotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Logo from '../components/Logo';
import UserHeaderTitle from '../components/UserHeaderTitle';
import BackButton from '../components/BackButton';
import TabBar from '../components/TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getHeaderOptions = (data) => {
  if (data.user) {
    return {
      headerTitle: props => <UserHeaderTitle {...props} user={data.user} navigation={data.navigation} route={data.route} />,
      headerLeft: props => <BackButton {...props} />
    }
  } else {
    return {
      headerTitle: props => <Logo {...props} navigation={data.navigation} route={data.route} />,
      headerLeft: props => <BackButton {...props} />
    };
  }
}

const TabScreens = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  )
}

const Router = ({
  initialRouteName = "Landing",
  initialAuthRoute = "Home",
  user,
  locationGranted
}) => {

  if (user.loading || !locationGranted) {
    // Haven't finished checking for the token yet
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user.isAuth ? initialAuthRoute : initialRouteName}>
        {user.isAuth ?
          <>
            <Stack.Screen
              options={props => getHeaderOptions({ ...props, user })}
              name="Home"
              component={TabScreens}
            />
            <Stack.Screen options={props => getHeaderOptions({ ...props, user })} name="Spot" component={SpotScreen} />
            <Stack.Screen options={props => getHeaderOptions({ ...props, user })} name="Profile" component={ProfileScreen} />
          </>
          :
          <>
            <Stack.Screen options={getHeaderOptions} name="Landing" component={LandingScreen} />
            <Stack.Screen options={getHeaderOptions} name="First Register" component={FirstRegister} />
            <Stack.Screen options={getHeaderOptions} name="Second Register" component={SecondRegister} />
            <Stack.Screen options={getHeaderOptions} name="Login" component={Login} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Router);
