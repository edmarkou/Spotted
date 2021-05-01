import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(userData) {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                token: userData.token,
                email: userData.email
            })
        );
    } catch (error) {
        // There was an error on the native side
        console.warn(error)
    }
};

export async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
        if (session !== undefined) {
            // Congrats! You've just retrieved your first value!
            return session;
        }
    } catch (error) {
        // There was an error on the native side
        console.warn(error)
    }
}

export async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
        // There was an error on the native side
        // You can find out more about this error by using the `error.code` property
        console.log(error.code); // ex: -25300 (errSecItemNotFound)
    }
}