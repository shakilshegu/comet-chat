import { CometChat } from "@cometchat-pro/chat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Influancer from "./component/Influancer";
import Brand from "./component/Brand";


const appID = "252116228eb131fd"
const region = "in"


const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization complete successfully");
  },
  (error) => {
    console.log("Initialization Failed", error);
  }
);


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Influancer/>}/>
      <Route path="/brand" element={<Brand/>}/>
    </Routes>
  </Router>
  );
}

export default App;
