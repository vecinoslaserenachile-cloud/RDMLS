import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logElearningActivity = async (courseName, userName, userEmail, actionType) => {
  try {
    await addDoc(collection(db, 'elearning_records'), {
      course: courseName,
      name: userName,
      email: userEmail,
      action: actionType, // 'login' or 'diploma_downloaded'
      timestamp: serverTimestamp()
    });
    console.log(`Logged ${actionType} for ${userName} in ${courseName}`);
  } catch (e) {
    console.error('Error logging e-learning activity:', e);
  }
};
