import React, {useState} from "react";
import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader, IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar, useIonAlert
} from "@ionic/react";
import {useHistory} from "react-router";
import {chevronBackOutline} from "ionicons/icons"

const RegisterPage: React.FC = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const [email, setEmail] = useState<any | null>("");
    const [password, setPassword] = useState<any | null>("");
    const [firstName, setFirstName] = useState<any | null>("");
    const [lastName, setLastName] = useState<any | null>("");

    const sendRegister = async () => {
        let objData = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        console.log(objData);
        return false;
    }

    const handleBack = () => {
        history.go(-1);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton onClick={handleBack} fill="clear">
                        <IonIcon slot="icon-only" color="dark" icon={chevronBackOutline}></IonIcon>
                    </IonButton>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="email"
                                value={email}
                                label="Correo"
                                labelPlacement="floating"
                                onIonChange={e => setEmail(e.detail.value!)}
                                ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="password"
                                value={password}
                                label="Contraseña"
                                labelPlacement="floating"
                                onIonChange={e => setPassword(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                value={firstName}
                                label="Nombre"
                                labelPlacement="floating"
                                onIonChange={e => setFirstName(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                value={lastName}
                                label="Apellido"
                                labelPlacement="floating"
                                onIonChange={e => setLastName(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={async () => {
                            if (await sendRegister()) {
                                await presentAlert({
                                    header: 'Ingreso Fallido',
                                    //subHeader: 'Important message',
                                    message: "error",
                                    buttons: ['OK'],
                                })
                            }
                        }
                        }>
                            Registrarse
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default RegisterPage;
