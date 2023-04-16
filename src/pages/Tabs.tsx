import { Redirect, Route } from 'react-router-dom';
import {
    IonContent,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, square, triangle } from 'ionicons/icons';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const Tabs: React.FC = () => (
    <IonContent>
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/tab1" />
                <Route exact path="/tabs/tab1">
                    <Tab1 />
                </Route>
                <Route exact path="/tabs/tab2">
                    <Tab2 />
                </Route>
                <Route path="/tabs/tab3">
                    <Tab3 />
                </Route>
                <Route exact path="/tabs/tabs">
                    <Redirect to="/tabs/tab1" />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tabs/tab1">
                    <IonIcon aria-hidden="true" icon={triangle} />
                    <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tabs/tab2">
                    <IonIcon icon={images} />
                    <IonLabel>Photos</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tabs/tab3">
                    <IonIcon aria-hidden="true" icon={square} />
                    <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    </IonContent>
);

export default Tabs;
