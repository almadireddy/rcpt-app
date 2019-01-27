import { createStackNavigator, createAppContainer } from 'react-navigation';
import List from './List';
import Stats from './Stats';
import Login from './Login';

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Home: { screen: List },
  Stats: { screen: Stats },
});

const App = createAppContainer(MainNavigator);

export default App;