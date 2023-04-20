import React from "react";
import {IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar} from "@ionic/react";
import {chevronBackOutline, logOutOutline} from "ionicons/icons";
import {useHistory} from "react-router";

interface ProfilePageProps {
    sendLogin: (value: boolean) => void;
}
const ProfilePage: React.FC<ProfilePageProps> = ({sendLogin}) => {
    const history = useHistory();

    const handleBack = () => {
        history.go(-1);
    };

    const handleLogOut = () => {
        sendLogin(false);
        console.log("logOut Successful!");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton onClick={handleBack} fill="clear">
                        <IonIcon slot="icon-only" color="dark" icon={chevronBackOutline}></IonIcon>
                    </IonButton>
                    <IonTitle>Profile Page Works!</IonTitle>
                    <IonButton onClick={handleLogOut} fill="clear">
                        <IonIcon slot="icon-only" color="dark" icon={logOutOutline}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRow>Works</IonRow>
            </IonContent>
        </IonPage>
    )

}

export default ProfilePage;
