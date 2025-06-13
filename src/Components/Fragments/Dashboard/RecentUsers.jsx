import React from "react";
import { Calendar } from "lucide-react";

const RecentUsers = ({ users }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="glass rounded-xl p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-blue-500 p-2 rounded-lg mr-3 group-hover:bg-blue-600 transition-colors duration-300">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Pengguna Terbaru</h2>
      </div>
      <div className="space-y-4">
        {users?.slice(0, 5).map((user, index) => (
          <div
            key={index}
            className="group flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-white/20 
              hover:bg-white/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300 cursor-pointer
              hover:border-blue-200"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full 
              flex items-center justify-center shadow-lg
              group-hover:scale-110 group-hover:shadow-xl
              transform transition-all duration-300"
            >
              <span className="text-white text-sm font-bold group-hover:scale-125 transition-transform duration-300">
                {user.fullname.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                {user.fullname}
              </p>
              <p className="text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-300">
                {user.email}
              </p>
            </div>
            <div
              className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg 
              group-hover:bg-blue-100 group-hover:text-blue-600 
              transition-all duration-300"
            >
              {formatDate(user.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
