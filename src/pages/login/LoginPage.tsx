import React, {useState} from 'react';
import {
    IonContent,
    IonInput,
    IonButton,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonIcon, IonItem, IonLabel, useIonAlert
} from '@ionic/react';
import {handleLogin} from "../../connection/HandleLogin";
import {personCircle} from "ionicons/icons";

interface LoginPageProps {
    sendLogin: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({sendLogin}) => {
    const [email, setEmail] = useState<any | null>("");
    const [password, setPassword] = useState<any | null>("");
    const [presentAlert] = useIonAlert();
    let error: string;

    const sendLog = async () => {
        console.log("works");
        let objData = {
            email: email,
            password: password
        }
        console.log(objData);
        const user = await handleLogin(objData);
        console.log(user);
        if (user.status === "failure") {
            error = user.message;
            console.log(user.message);
            return true;
        } else {
            sendLogin(true);
            return false;
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRow>
                    <IonCol  class="ion-text-center">
                        <IonIcon
                            style={{ fontSize: "70px", color: "#0040ff" }}
                            icon={personCircle}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="email"
                                value={email}
                                label="Correo"
                                labelPlacement="floating"
                                onIonChange={e => setEmail(e.detail.value!)}
                            >
                            </IonInput>
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
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {/*<p style={{ fontSize: "small" }}>*/}
                        {/*    By clicking LOGIN you agree to our <a href="#">Policy</a>*/}
                        {/*</p>*/}
                        <IonButton expand="block" onClick={async () => {
                            if (await sendLog()) {
                                presentAlert({
                                    header: 'Ingreso Fallido',
                                    //subHeader: 'Important message',
                                    message: error,
                                    buttons: ['OK'],
                                })
                            }
                        }
                        }>
                            Login
                        </IonButton>
                        <p style={{ fontSize: "medium" }}>
                            Don't have an account? <a href="#">Sign up!</a>
                        </p>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
