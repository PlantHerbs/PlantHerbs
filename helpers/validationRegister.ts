import { firestore } from "../config";


export async function validationRegister(data: any): Promise<boolean | string> {
    // Memeriksa validitas email menggunakan regular expression sederhana

    const userEmail = data.email;

    if( !data.fullName || !data.email || !data.password || !userEmail){
        return 'data kosong';
    }

    const snapshot = await firestore.collection('users')
    .where('email', '==', userEmail)
    .get()

    if(!snapshot.empty){
        return 'Email sudah terdaftar';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( typeof data.email !== 'string' || !emailRegex.test(data.email)) {
        return 'Email tidak valid';
    }

    if ( typeof data.password !== 'string' || data.password.length < 6) {
        return 'Password harus berupa string dengan panjang minimal 6 karakter';
    }

    return true;
}