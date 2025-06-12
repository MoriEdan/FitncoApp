import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AppIntroSliderScreen,
  LogupScreen,
  SplashScreen,
  NameSurnameScreen,
  TimeZoneScreen,
  TimeZoneSearchScreen,
  UploadAvatarScreen,
  PermissionsScreen,
  DailyJourneyScreen,
  MessagingScreen,
  ApprovalScreen,
  UserProfileScreen,
  ProfileEditScreen,
  SettingsScreen,
  AdminMessagesScreen,
  TrackingListScreen,
  TrackingListFilterScreen,
  TrackingListMessageScreen,
  ReadyMessagesScreen,
  NewUserScreen,
  ManagementList,
  AdminMessageDetailScreen,
  QuickMessagesScreen,
  InfoEditScreen,
  NewDietScreen,
  ProfileScreen,
  NotApproveScreen,
  LoginScreen,
  ForgotPassScreen,
  InfoScreen,
  SetPassScreen,
  SetUserScreen,
  WeightEditScreen,
} from './src/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BasketActiveIcon,
  BasketPassiveIcon,
  DailyJourneyActiveIcon,
  DailyJourneyPassiveIcon,
  MessageActiveIcon,
  MessageNotifIcon,
  MessagePassiveIcon,
  MessageSendIcon,
  ProfileActiveIcon,
  ProfilePassiveIcon,
  UsersActiveIcon,
  UsersPassiveIcon,
} from './src/assets/icons';
import {SafeAreaView, View} from 'react-native';

import axios from 'axios';
import {APPROVALS, COLORS, UNREAD} from './src/constants';
//import * as Sentry from '@sentry/react-native';
import SocketProvider from './src/constants/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*Sentry.init({
  dsn: 'https://db11e337d50948c5a9c18f6e45e713e2@o274975.ingest.sentry.io/6420851',
});
*/
const Stack = createNativeStackNavigator();

//login
const LoginStack = createNativeStackNavigator();
function Login() {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="AppIntroSlider"
        component={AppIntroSliderScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="Logup"
        component={LogupScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="Signin"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="NotApprove"
        component={NotApproveScreen}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
}

//auth
const AdminStack = createBottomTabNavigator();
const adminBars = [
  {
    screenName: 'TrackingList',
    activeIcon: <DailyJourneyActiveIcon />,
    notActiveIcon: <DailyJourneyPassiveIcon />,
    component: TrackingListScreensStack,
  },
  {
    screenName: 'AdminMessages',
    activeIcon: <MessageActiveIcon />,
    notifIcon: <MessageNotifIcon />,
    notActiveIcon: <MessagePassiveIcon />,
    component: MessageScreensStack,
  },
  {
    screenName: 'ManagementList',
    activeIcon: <UsersActiveIcon />,
    notActiveIcon: <UsersPassiveIcon />,
    component: ManagementList,
  },
];
function TrackingListScreensStack() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <Stack.Navigator
        initialRouteName="TrackingListScreen"
        screenOptions={({route}) => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name={'TrackingListScreen'}
          component={TrackingListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
function MessageScreensStack() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <Stack.Navigator
        initialRouteName="MessagesScreen"
        screenOptions={({route}) => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name={'MessagesScreen'}
          component={AdminMessagesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
function Admin() {
  const [isNotif, setIsNotif] = React.useState(false);
  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          axios
            .get(UNREAD, {headers: {Authorization: 'Bearer ' + token}})
            .then(res => {
              setIsNotif(res.data.data == 1);
            });
        }
      } catch (e) {}
    }

    const intervalId = setInterval(() => {
      fetchMyAPI();
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <AdminStack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      {adminBars.map(item => {
        return (
          <AdminStack.Screen
            name={item.screenName}
            component={item.component}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => {
                return focused
                  ? item.activeIcon
                  : isNotif
                  ? item.notifIcon
                    ? item.notifIcon
                    : item.notActiveIcon
                  : item.notActiveIcon;
              },
              tabBarShowLabel: false,
            }}
          />
        );
      })}
    </AdminStack.Navigator>
  );
}
const UserStack = createBottomTabNavigator();
const clientBars = [
  {
    screenName: 'Profile',
    activeIcon: <ProfileActiveIcon />,
    notActiveIcon: <ProfilePassiveIcon />,
    component: ProfileScreen,
  },
  {
    screenName: 'Messaging',
    activeIcon: <MessageActiveIcon />,
    notifIcon: <MessageNotifIcon />,
    notActiveIcon: <MessagePassiveIcon />,
    component: MessagingScreen,
  },

  {
    screenName: 'DailyJourney',
    activeIcon: <BasketActiveIcon />,
    notActiveIcon: <BasketPassiveIcon />,
    component: DailyJourneyScreen,
  },
];
function User() {
  const [isNotif, setIsNotif] = React.useState(false);
  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          axios
            .get(UNREAD, {headers: {Authorization: 'Bearer ' + token}})
            .then(res => {
              setIsNotif(res.data.data == 1);
            });
        }
      } catch (e) {
        // Logout the user and redirect to the login page
      }
    }

    const intervalId = setInterval(() => {
      fetchMyAPI();
    }, 1000 * 5); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);
  return (
    <UserStack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      {clientBars.map(item => {
        return (
          <UserStack.Screen
            name={item.screenName}
            component={item.component}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => {
                return focused
                  ? item.activeIcon
                  : isNotif
                  ? item.notifIcon
                    ? item.notifIcon
                    : item.notActiveIcon
                  : item.notActiveIcon;
              },
              tabBarShowLabel: false,
            }}
          />
        );
      })}
    </UserStack.Navigator>
  );
}
function App() {
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPass"
            component={ForgotPassScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEditScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WeightEdit"
            component={WeightEditScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InfoEdit"
            component={InfoEditScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NewDiet"
            component={NewDietScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TrackingListFilter"
            component={TrackingListFilterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TrackingListMessage"
            component={TrackingListMessageScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReadyMessages"
            component={ReadyMessagesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NewUser"
            component={NewUserScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MessageDetail"
            component={AdminMessageDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuickMessages"
            component={QuickMessagesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NameSurnameScreen"
            component={NameSurnameScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Info"
            component={InfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TimeZone"
            component={TimeZoneScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TimeZoneSearch"
            component={TimeZoneSearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UploadAvatar"
            component={UploadAvatarScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Permissions"
            component={PermissionsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Approval"
            component={ApprovalScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SetPass"
            component={SetPassScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SetUser"
            component={SetUserScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}

export default App;
