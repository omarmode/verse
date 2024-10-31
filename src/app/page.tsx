"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatRoomInfo from "../components/ChatRoomInfo";
import {
  Phone,
  Users,
  Send,
  Files,
  Mic,
  Image,
  MoreVertical,
  Smile,
  Video,
  Menu,
} from "lucide-react";
import { sendMessage, listenToMessages } from "../../lib/messageService";
interface Room {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  date: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  type: "text" | "call";
  senderImage: string; // صورة المرسل
}
const rooms = [
  {
    id: "1",
    name: "Room A",
    lastMessage: "Hello there!",
    time: "09:00 AM",
    date: "11-Sep-2024",
  },
  {
    id: "2",
    name: "Room B",
    lastMessage: "What’s up?",
    time: "08:45 AM",
    date: "10-Sep-2024",
  },
  {
    id: "3",
    name: "Room C",
    lastMessage: "Good morning!",
    time: "08:30 AM",
    date: "09-Sep-2024",
  },
];
export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<string>("Dr. Ahmed Hassan");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Dr. Sofia Ibrahim",
      content: "Missed Video Call",
      time: "10-Sep-2023 09:44 PM",
      type: "text",
      senderImage:
        "https://frontend-2024-v-verses-projects.vercel.app/_next/image?url=https%3A%2F%2Ftest-api.myvverse.com%2Fstorage%2Fattachments%2Fuser_folders%2F43%2FAssets%2F46ZQO1gIn3prnG0aHnbkoT55Jdp5pL8WDDQmw4Ha.png&w=48&q=75",
    },
    {
      id: "2",
      sender: "Dr. Ahmed Hassan",
      content:
        "Duis amet congue iaculis placerat bibendum. Praetium libero rutrum.",
      time: "16-Sep-2023 11:30 AM",
      type: "text",
      senderImage: "/path/to/sender2.jpg",
    },
    {
      id: "3",
      sender: "Dr. Sofia Ibrahim",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit.",
      time: "16-Sep-2023 11:32 AM",
      type: "text",
      senderImage:
        "https://frontend-2024-v-verses-projects.vercel.app/_next/image?url=https%3A%2F%2Ftest-api.myvverse.com%2Fstorage%2Fattachments%2Fuser_folders%2F43%2FAssets%2F46ZQO1gIn3prnG0aHnbkoT55Jdp5pL8WDDQmw4Ha.png&w=48&q=75",
    },
  ]);
  useEffect(() => {
    const unsubscribe = listenToMessages((newMessages) => {
      setMessages(newMessages as Message[]);
      console.log("Received messages:", newMessages);
    });

    // تنظيف الاشتراك عند إلغاء التحميل
    return () => unsubscribe();
  }, []);
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      try {
        // إرسال الرسالة إلى Firestore باسم المستخدم النشط
        await sendMessage(newMessage, activeUser);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-2 relative">
      <button
        className="lg:hidden p-2 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-lg absolute top-2 left-2"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden lg:block shadow-lg bg-white">
        <Sidebar
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          rooms={rooms}
        />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-64 bg-white shadow-lg">
            <Sidebar
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              rooms={rooms}
            />
          </div>
          <button
            className="flex-1"
            onClick={() => setIsSidebarOpen(false)}
          ></button>
        </div>
      )}

      <div className="flex-1 flex flex-col bg-white shadow-lg ml-4">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center bg-white">
          {/* Icon with gradient background and "Room Name" */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
              <Users className="text-white w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-black">Room Name</h2>
          </div>

          {/* Call button */}
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-red-500 text-white px-4 py-2 rounded-lg">
            <Phone />
            Call
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex items-center justify-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-2 px-3 py-1 text-black text-xs border border-gray-300 rounded-full bg-white">
              16-Sep-2023 11:45 AM
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* <div className="flex justify-between items-center p-4 border rounded-full shadow-sm bg-white mt-2 mx-[4%]">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
                <Video className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-gray-700 ml-3">Missed Video Call</p>
            </div>
            <span className="text-xs text-gray-500">16-Sep-2023 11:45 AM</span>
          </div> */}
          <div
            className="relative flex justify-between items-center p-[1px] rounded-full shadow-sm bg-white mt-2 mx-[4%]"
            style={{
              background: "linear-gradient(to right, #3b82f6, #ef4444)", // لون الحواف المتدرج
            }}
          >
            <div className="flex items-center justify-between w-full bg-white rounded-full p-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-2 border-transparent flex items-center justify-center">
                  <Video className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-gray-700 ml-3">Missed Video Call</p>
              </div>
              <span className="text-xs text-gray-500">
                16-Sep-2023 11:45 AM
              </span>
            </div>
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className="relative flex flex-col gap-2">
              <div className="flex gap-4 items-start">
                {/* صورة المرسل خارج إطار الرسالة */}
                <div className="relative">
                  <img
                    src={
                      msg.sender === "Dr. Ahmed Hassan"
                        ? "/path/to/sender2.jpg" // صورة Dr. Ahmed Hassan
                        : "https://frontend-2024-v-verses-projects.vercel.app/_next/image?url=https%3A%2F%2Ftest-api.myvverse.com%2Fstorage%2Fattachments%2Fuser_folders%2F43%2FAssets%2F46ZQO1gIn3prnG0aHnbkoT55Jdp5pL8WDDQmw4Ha.png&w=48&q=75" // صورة Dr. Sofia Ibrahim
                    }
                    alt={`${msg.sender} profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* الرسالة */}
                <div className="flex-1 p-4 border rounded-lg shadow-sm bg-white mt-2">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-black">{msg.sender}</p>
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </div>
                  <hr className="border-gray-300 mb-2" />

                  {/* رسالة النص */}
                  <p className="text-gray-700">{msg.content}</p>
                </div>
              </div>

              {/* عرض التاريخ وأيقونة علامتي الصح */}
              <div className="flex justify-end items-center mt-1 text-xs text-black">
                <span className="mr-2">{msg.time}</span>
                {msg.sender === "Dr. Ahmed Hassan" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#3b82f6" // لون أزرق فاتح
                    viewBox="0 0 24 24"
                    className="ml-1"
                  >
                    <path d="M20.285 6.707l-8.992 8.992-4.285-4.285-1.414 1.414 5.699 5.699 10.407-10.407-1.415-1.413zm-5.7-1.414l-1.415-1.415-8.169 8.169 1.415 1.415 8.169-8.169z" />
                  </svg>
                )}
              </div>
            </div>
          ))}

          <div
            className="relative flex justify-between items-center p-[1px] rounded-full shadow-sm bg-white mt-20 mb-5 mx-[4%]"
            style={{
              background: "linear-gradient(to right, #3b82f6, #ef4444)",
            }}
          >
            <div className="flex items-center justify-between w-full bg-white rounded-full p-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-2 border-transparent flex items-center justify-center">
                  <Video className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-gray-700 ml-3">Missed Video Call</p>
              </div>
              <span className="text-xs text-gray-500">
                16-Sep-2023 11:45 AM
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border rounded-full shadow-sm bg-white mt-2 mx-[4%]">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-700 ml-3">Missed Call</p>{" "}
            </div>
            <span className="text-xs text-gray-500">16-Sep-2023 11:45 AM</span>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center mb-2 gap-2">
            <div className="relative">
              <img
                src={
                  activeUser === "Dr. Ahmed Hassan"
                    ? "/path/to/sender2.jpg" // صورة Dr. Ahmed Hassan
                    : "https://frontend-2024-v-verses-projects.vercel.app/_next/image?url=https%3A%2F%2Ftest-api.myvverse.com%2Fstorage%2Fattachments%2Fuser_folders%2F43%2FAssets%2F46ZQO1gIn3prnG0aHnbkoT55Jdp5pL8WDDQmw4Ha.png&w=48&q=75" // صورة Dr. Sofia Ibrahim
                }
                alt={activeUser}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>

              {showUserMenu && (
                <div className="absolute bottom-12 left-0 bg-white shadow-lg border rounded-md p-2 flex flex-col">
                  <button
                    onClick={() => {
                      setActiveUser("Dr. Ahmed Hassan");
                      setShowUserMenu(false);
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <img
                      src="/path/to/sender2.jpg"
                      alt="Dr. Ahmed Hassan"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-black">Dr. Ahmed Hassan</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveUser("Dr. Sofia Ibrahim");
                      setShowUserMenu(false);
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <img
                      src="https://frontend-2024-v-verses-projects.vercel.app/_next/image?url=https%3A%2F%2Ftest-api.myvverse.com%2Fstorage%2Fattachments%2Fuser_folders%2F43%2FAssets%2F46ZQO1gIn3prnG0aHnbkoT55Jdp5pL8WDDQmw4Ha.png&w=48&q=75"
                      alt="Dr. Sofia Ibrahim"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-black">Dr. Sofia Ibrahim</span>
                  </button>
                </div>
              )}
            </div>

            {/* Text input */}
            <input
              type="text"
              placeholder="Please Write Your Message Here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded text-black"
            />
          </div>

          {/* الأيقونات وزر الإرسال */}
          <div className="flex items-center gap-2 justify-end">
            <Smile className="w-5 h-5 text-blue-500 cursor-pointer" />
            <Files className="w-5 h-5 text-blue-500" />
            <Mic className="w-5 h-5 text-blue-500" />
            <Image className="w-5 h-5 text-blue-500" />

            {/* زر الإرسال */}
            <button
              onClick={handleSendMessage}
              className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-lg"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block ml-4">
        <ChatRoomInfo />
      </div>
    </div>
  );
}
