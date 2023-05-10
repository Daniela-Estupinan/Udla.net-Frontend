import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    IonCol,
    IonInput,
    IonItem
} from "@ionic/react";
import {chevronBackOutline, logOutOutline} from "ionicons/icons";
import {useHistory} from "react-router";

interface ProfilePageProps {
    sendLogin: (value: boolean) => void;
    userData: any;
}

const ProfilePage: React.FC<ProfilePageProps> = ({sendLogin, userData}) => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLasttName] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    const handleBack = () => {
        history.go(-1);
    };

    const handleLogOut = () => {
        sendLogin(false);
        history.push('/login');
        console.log("logOut Successful!");
    };

    useEffect(() => {
        console.log(userData);
        if (userData) {
            setFirstName(userData.firstName);
            setLasttName(userData.lastName);
            setRole(userData.role);
            setDescription(userData.description);
        }

    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton onClick={handleBack} fill="clear">
                        <IonIcon slot="icon-only" color="dark" icon={chevronBackOutline}></IonIcon>
                    </IonButton>
                    <IonTitle>Perfil</IonTitle>
                    <IonButton onClick={handleLogOut} fill="clear">
                        <IonIcon slot="icon-only" color="dark" icon={logOutOutline}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                label="Nombre"
                                labelPlacement="floating"
                                value={firstName}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                label="Apellido"
                                labelPlacement="floating"
                                value={lastName}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                label="Cargo"
                                labelPlacement="floating"
                                value={role}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                label="Descripcion"
                                labelPlacement="floating"
                                value={description}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )

}

export default ProfilePage;
