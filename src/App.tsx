import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {images, square, triangle} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tabs from "./pages/Tabs";
import {useState} from "react";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import ProfilePage from "./pages/user/ProfilePage";

setupIonicReact();

const App: React.FC = () => {

    const [isAuthed, setIsAuthed] = useState(false);
    const sendLogin = (data: any) => {
        console.log(data);
        setIsAuthed(data);
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route
                        path="/tabs"
                        render={(props) => {
                            return isAuthed ? <Tabs/> : <LoginPage sendLogin={sendLogin}/>;
                        }}
                    />
                    <Route exact path="/login">
                        <LoginPage  sendLogin={sendLogin}/>
                    </Route>
                    <Route exact path="/register">
                        <RegisterPage sendLogin={sendLogin} />
                    </Route>
                    <Route
                        path="/profile"
                        render={(props) => {
                            return isAuthed ? <ProfilePage sendLogin={sendLogin}/> : <LoginPage sendLogin={sendLogin}/>;
                        }}
                    />
                    <Route exact path="/">
                        <Redirect to="/tabs"/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
