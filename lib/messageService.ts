// lib/messageService.ts
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// وظيفة لإرسال رسالة
export const sendMessage = async (message: string, userId: string) => {
  try {
    await addDoc(collection(db, "messages"), {
      text: message,
      userId: userId,
      timestamp: new Date(), // استخدام الطابع الزمني الحالي
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// وظيفة للاستماع إلى الرسائل
export const listenToMessages = (callback: (messages: any[]) => void) => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

  // إرجاع دالة الإلغاء من onSnapshot
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("Document data:", data);
      return {
        id: doc.id,
        sender: data.userId, // تعيين الحقل بشكل صحيح
        content: data.text, // تعيين محتوى الرسالة
        time:
          data.timestamp?.toDate().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }) || "Unknown time",
        senderImage: "/path/to/default.jpg", // تخصيص صورة افتراضية أو حسب الحاجة
        type: "text", // تعيين نوع الرسالة
      };
    });
    callback(messages);
  });

  return unsubscribe; // إرجاع دالة الإلغاء
};
