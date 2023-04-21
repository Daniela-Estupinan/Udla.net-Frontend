import React, {useState} from "react";
import {
    IonButton,
    IonCol,
    IonSelect,
    IonLabel,
    IonContent,
    IonSelectOption,
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
import {handleSignUp} from "../../connection/HandleLogin";

interface RegisterPageProps {
    sendLogin: (value: boolean) => void;
}
const RegisterPage: React.FC<RegisterPageProps> = ({sendLogin}) => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const [email, setEmail] = useState<any | null>("");
    const [password, setPassword] = useState<any | null>("");
    const [firstName, setFirstName] = useState<any | null>("");
    const [lastName, setLastName] = useState<any | null>("");
    const [age, setAge] = useState<any | null>("");
    const [gender, setGender] = useState<any | null>("");
    const [major, setMajor] = useState<any | null>("");
    const [semester, setSemester] = useState<any | null>("");
    const [isValid, setIsValid] = useState<boolean>();//validate the email
    const [isTouched, setIsTouched] = useState(false);
    let error: string;

    const sendRegister = async () => {
        let objData = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            major: major,
            semester: semester
        }
        console.log(objData);
        const user = await handleSignUp(objData);
        console.log(user);
        if (user.status === "failure") {
            error = user.message;
            console.log(user.message);
            return true;
        } else {
            sendLogin(true);
            console.log("works");
            history.push('/tabs');
            return false;
        }
    }

    const handleBack = () => {
        history.go(-1);
    };

//control email
const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-z.]+(?:\.[a-z.]+)*@[a-z](?:[a-z]{0,61}[a-z])?(?:\.[a-z](?:[a-z]{0,61}[a-z])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === '') return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  }


 

  //return 
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
                                className={`${isValid && 'ion-valid'} ${
                                    isValid === false && 'ion-invalid'
                                  } ${isTouched && 'ion-touched'}`}
                                type="email"
                                value={email}
                                label="Correo"
                                labelPlacement="floating"
                                helperText="Enter a valid email"
                                errorText="Invalid email"
                                onIonInput={(e) => validate(e)}
                                onIonBlur={() => markTouched()}
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
                                counter={true}
                                minlength={8}
                                maxlength={20}
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
                        <IonItem>
                            <IonInput
                                type="number"
                                value={age}
                                label="Edad"
                                labelPlacement="floating"
                                onIonChange={e => setAge(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>    
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                value={major}
                                label="Carrera"
                                labelPlacement="floating"
                                onIonChange={e => setMajor(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>     
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="number"
                                value={semester}
                                label="Semestre"
                                labelPlacement="floating"
                                onIonChange={e => setSemester(e.detail.value!)}                             
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>  
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                value={gender}
                                label="Genero"
                                labelPlacement="floating"
                                maxlength={2}
                                placeholder="(F,M,O)"
                                onIonChange={e => setGender(e.detail.value!)}                             
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>  
                 <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={async () => {
                            if (await sendRegister()) {
                                await presentAlert({
                                    header: 'Registro Fallido',
                                    //subHeader: 'Important message',
                                    message: error,
                                    buttons: ['OK'],
                                })
                            } else {
                                await presentAlert({
                                    header: 'Usuario Creado',
                                    subHeader: 'Ya puedes ir a tu perfil y editar tu información',
                                    //message: "Regresa para loggearte",
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
