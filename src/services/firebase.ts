import firebase from "firebase/app";

export const getRealtimeProducts = (): any | undefined => {
    const db = firebase.database();
    const ref = db.ref("/");
    ref.on(
        "value",
        (snapshot) => {
            return snapshot.val();
        },
        (errorObject) => {
            console.log(errorObject);
            return undefined;
        }
    );
};

export const getRealtimeProductById = (id: string | string[]): any | undefined => {
    const db = firebase.database();
    const ref = db.ref(`/${id}`);
    let response;
    ref.on(
        "value",
        (snapshot) => {
            response = snapshot.val();
        },
        (errorObject) => {
            console.log(errorObject);
            response = undefined;
        }
    );
    return response;
};
