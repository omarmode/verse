"use client";
import { FC, useState } from "react";
import {
  Search,
  Bell,
  User,
  Users,
  MessageSquare,
  Share2,
  MoreVertical,
  Home,
  SlidersHorizontal,
} from "lucide-react";

interface Room {
  id: string;
  name: string;
  lastMessage: string;
  time: string; // وقت الرسالة
  date: string; // تاريخ الرسالة
}

interface SidebarProps {
  selectedRoom: string | null;
  setSelectedRoom: (roomId: string) => void;
  rooms: Room[];
}

const Sidebar: FC<SidebarProps> = ({
  selectedRoom,
  setSelectedRoom,
  rooms,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // تصفية الغرف بناءً على النص المدخل في البحث
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-96 h-screen bg-white shadow-lg overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between relative">
        <div className="flex space-x-4 items-center">
          {/* زر All */}
          <button className="text-black font-semibold">All</button>

          {/* زر 1:1 Chat في المنتصف */}
          <button className="text-gray-500">1:1 Chat</button>

          {/* زر ChatRooms مع الخط الأزرق */}
          <button className="text-blue-500 relative">
            ChatRooms
            {/* الخط الأزرق الذي ينزل للأسفل */}
            <span className="absolute left-0 right-0 bottom-[-24px] h-1 bg-blue-500"></span>
          </button>
        </div>

        {/* Home Icon with Gradient Background */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
          <Home className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Search Bar with Filter Icon */}
      <div className="p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search All Chat Rooms"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 bg-transparent outline-none text-sm flex-grow text-black"
          />
          {/* Filter Icon with Gradient Background */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center ml-2">
            <SlidersHorizontal className="text-white w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Chat Room List */}
      <div className="p-4 space-y-3">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setSelectedRoom(room.id)}
            className={`p-3 rounded-lg cursor-pointer transition flex flex-col ${
              selectedRoom === room.id
                ? "bg-gradient-to-r from-blue-600 to-red-600 text-white"
                : "bg-white shadow-sm text-black"
            }`}
            style={{ minHeight: "80px" }}
          >
            {/* Header with Two Users Icon and Vertical Menu Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                {/* Icon with Two Users */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
                  <Users className="text-white w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">{room.name}</h3>
              </div>
              <MoreVertical
                className={`w-5 h-5 ${
                  selectedRoom === room.id ? "text-white" : "text-gray-500"
                }`}
              />
            </div>

            {/* Message and Icons */}
            <div className="flex items-center mb-2 space-x-2 pl-4">
              {/* Small User Icon with Activity Indicator */}
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </div>
                {/* Active Status Indicator */}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="text-sm truncate text-blue-400">
                {room.lastMessage}
              </p>
            </div>

            {/* Time, Date, and Icons Row */}
            <div className="flex items-center justify-between">
              {/* Time and Date on the Left */}
              <div
                className={`text-xs ${
                  selectedRoom === room.id ? "text-white" : "text-black"
                }`}
              >
                {`${room.date}; ${room.time}`}
              </div>

              {/* Icons on the Right, closer to Time and Date */}
              <div className="flex space-x-1">
                <MessageSquare
                  className={`w-5 h-5 ${
                    selectedRoom === room.id ? "text-white" : "text-gray-500"
                  }`}
                />
                <Share2
                  className={`w-5 h-5 ${
                    selectedRoom === room.id ? "text-white" : "text-gray-500"
                  }`}
                />
                <Bell
                  className={`w-5 h-5 ${
                    selectedRoom === room.id ? "text-white" : "text-gray-500"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
