import { FC } from "react";
import {
  Search,
  Users,
  FileText,
  StickyNote,
  MicOff,
  Trash,
  Edit,
  LogOut,
  Phone,
  ChevronRight,
} from "lucide-react"; // استيراد الأيقونات

const ChatRoomInfo: FC = () => {
  return (
    <div className="w-80 bg-white shadow-lg p-4 rounded-lg">
      {/* عنوان القسم */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">
          Chat Room Info
        </h2>
      </div>

      {/* تفاصيل الغرفة */}
      <div className="p-4 border rounded-lg shadow-sm bg-white mb-4">
        <div className="flex flex-col items-center mb-2">
          {/* الأيقونة فوق كلمة Room Name */}
          <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
            <Users className="text-white w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">
            Room Name
          </h3>
        </div>
        <p className="text-gray-600 mb-2 text-center">
          This will be Room Tagline & it can be over 2 lines based on your
          needs.
        </p>
        <div className="text-xs text-gray-500 mb-2 text-center">
          16-Sep-2023 09:44 PM
        </div>

        {/* أيقونات تفاعلية مع الأرقام بجانبها */}
        <div className="flex justify-around items-center">
          <div className="flex items-center space-x-1">
            <Search className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-700">5</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-700">12</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-700">3</span>
          </div>
          <div className="flex items-center space-x-1">
            <StickyNote className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-700">7</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-700">8</span>
          </div>
        </div>
      </div>

      {/* أزرار التحكم مع الحواف الدائرية ولون الحدود */}
      <div className="space-y-2">
        {[
          {
            icon: <MicOff className="w-5 h-5 text-red-500" />,
            text: "Mute Chat",
          },
          {
            icon: <Trash className="w-5 h-5 text-red-500" />,
            text: "Clear Chat",
          },
          {
            icon: <Edit className="w-5 h-5 text-blue-500" />,
            text: "Edit Room",
          },
          {
            icon: <LogOut className="w-5 h-5 text-blue-500" />,
            text: "Exit Room",
          },
          {
            icon: <Trash className="w-5 h-5 text-red-500" />,
            text: "Remove Room",
          },
        ].map((button, index) => (
          <button
            key={index}
            className="relative w-full flex items-center justify-between p-2 rounded-full hover:bg-gray-100"
            style={{
              background: "linear-gradient(to right, #3b82f6, #ef4444)",
              padding: "1px", // إضافة padding للزر لإظهار الحدود
            }}
          >
            <div className="flex items-center justify-between w-full bg-white rounded-full p-2">
              {button.icon}
              <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">
                {button.text}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomInfo;
