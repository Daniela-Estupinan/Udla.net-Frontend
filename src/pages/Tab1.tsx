import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { personCircle} from "ionicons/icons";
import React from "react";
import {useHistory} from "react-router";

const Tab1: React.FC = () => {
    const history = useHistory();

    const handleProfile = () => {
        history.push('/profile')
    }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonGrid fixed={true}>
                <IonRow>
                    <IonCol>
                        <IonButton onClick={handleProfile} fill="clear">
                            <IonIcon slot="icon-only" color="dark" icon={personCircle}></IonIcon>
                        </IonButton>
                    </IonCol>
                    <IonCol>
                        <IonTitle>Tab 1</IonTitle>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
