import { GlobalStyle } from "./style";
import { Suspense } from "react";
import { RouteConfig } from "./routes/RouteConfig";
import {Loading} from 'antd-mobile'

function App() {
  return (
    <div className="App">
    <GlobalStyle/>
    <Suspense fallback={<Loading style={{'--size':'48px'}}/>}><RouteConfig/></Suspense>
    </div>
  );
}

export default App;
