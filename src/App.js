import React from 'react';

//style
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
//router
import routes from './routes/index';
import {renderRoutes  } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
//redux
import { Provider } from 'react-redux'
import store from './store/index'


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {/* renderRoutes(routes)会把routers作为props传入到Home组件中 */}
      {renderRoutes(routes)}
    </HashRouter>
    </Provider>
    
  );
}

export default App;
