import app from "@/config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const loginWithEmailAndPassword = async ({email, password}) => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}

module.exports = {
    loginWithEmailAndPassword
}