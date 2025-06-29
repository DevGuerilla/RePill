import React from "react";
import { Calendar, User } from "lucide-react";

const RecentUsers = ({ users }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!users || users.length === 0) {
    return (
      <section
        className="glass rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
        aria-label="Pengguna terbaru"
      >
        <header className="flex items-center mb-4 sm:mb-6">
          <div className="bg-blue-500 p-2 rounded-lg mr-3 group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Pengguna Terbaru
          </h2>
        </header>
        <div className="text-center py-8">
          <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 text-gray-300" />
          <p
            className="text-gray-500"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Belum ada pengguna terbaru
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="glass rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
      aria-label="Pengguna terbaru"
    >
      <header className="flex items-center mb-4 sm:mb-6">
        <div className="bg-blue-500 p-2 rounded-lg mr-3 group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h2
          className="font-bold text-gray-900"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Pengguna Terbaru
        </h2>
      </header>
      <div className="space-y-3 sm:space-y-4">
        {users?.slice(0, 5).map((user, index) => (
          <article
            key={index}
            className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl border border-white/20 
              hover:bg-white/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300 cursor-pointer
              hover:border-blue-200 min-h-[60px] sm:min-h-[72px]"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
            role="button"
            tabIndex={0}
            aria-label={`Pengguna ${user.fullname}, bergabung ${formatDate(
              user.created_at
            )}`}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full 
              flex items-center justify-center shadow-lg
              group-hover:scale-110 group-hover:shadow-xl
              transform transition-all duration-300 flex-shrink-0"
            >
              <span
                className="text-white font-bold group-hover:scale-125 transition-transform duration-300"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
              >
                {user.fullname?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                title={user.fullname}
              >
                {user.fullname}
              </p>
              <p
                className="text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-300"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                title={user.email}
              >
                {user.email}
              </p>
            </div>
            <div
              className="bg-gray-100 px-2 py-1 rounded-lg 
              group-hover:bg-blue-100 group-hover:text-blue-600 
              transition-all duration-300 flex-shrink-0"
              style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
            >
              {formatDate(user.created_at)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentUsers;
