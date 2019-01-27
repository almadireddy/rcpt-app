import { createStackNavigator, createAppNavigator } from 'react-navigation';
import List from './List';
import Stats from './Stats';

const MainNavigator = createStackNavigator({
  Home: { screen: List },
  Stats: { screen: Stats },
});

const App = createAppNavigator(MainNavigator);

export default App;