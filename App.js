import { createStackNavigator, createAppContainer } from 'react-navigation';
import List from './List';
import Stats from './Stats';

const MainNavigator = createStackNavigator({
  Home: { screen: List },
  Stats: { screen: Stats },
});

const App = createAppContainer(MainNavigator);

export default App;