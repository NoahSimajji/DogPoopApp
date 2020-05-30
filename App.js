import {createStackNavigator,createAppContainer} from 'react-navigation';
import loginScreen from './screens/loginScreen.js';
import contentsScreen from './screens/contentsScreen.js';

const AppNavigator = createStackNavigator(
  {
    loginScreen: loginScreen,
    contentScreen:contentsScreen,
    
  },
  {
    initialRouteName: "loginScreen",
    headerMode: 'none',
  }
);
export default createAppContainer(AppNavigator);






