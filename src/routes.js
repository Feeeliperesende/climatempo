import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../src/pages/Home';
import Search from '../src/pages/Search';

const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: 'Minha Cidade' }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{ title: 'Procurar Cidade' }}
      />
    </Drawer.Navigator>
  );
}

export default Routes;
