import React from "react";
import { useNavigate } from "react-router";
import {
  Edit,
  Trash2,
  User,
  Mail,
  Calendar,
  Shield,
  Users,
  MoreVertical,
  Eye,
} from "lucide-react";

const DashUser = ({ users, loading, onEdit, onDelete, pagination }) => {
  const navigate = useNavigate();

  const handleViewDetail = (userUuid) => {
    navigate(`/dashboard/user/${userUuid}`);
  };

  const handleRowClick = (userUuid, event) => {
    // Prevent navigation if clicking on action buttons
    if (event.target.closest("button")) {
      return;
    }
    handleViewDetail(userUuid);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div
          className="flex justify-center items-center h-64"
          role="status"
          aria-label="Memuat data pengguna"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p
              className="mt-4 text-gray-600 font-medium"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Memuat data pengguna...
            </p>
            <span className="sr-only">Memuat...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-16">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          <h3
            className="font-semibold text-gray-900 mb-2"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
          >
            Tidak ada pengguna ditemukan
          </h3>
          <p
            className="text-gray-500 max-w-md mx-auto"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Belum ada data pengguna yang tersedia atau tidak ada yang sesuai
            dengan kriteria pencarian Anda.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleBadgeColor = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "moderator":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case "admin":
        return <Shield className="h-3 w-3 mr-1" />;
      case "user":
        return <User className="h-3 w-3 mr-1" />;
      case "moderator":
        return <Shield className="h-3 w-3 mr-1" />;
      default:
        return <User className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Daftar Pengguna
              </h3>
              <p className="text-sm text-gray-600">
                Kelola semua pengguna sistem
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pagination && (
              <span className="px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">
                {users.length} dari {pagination.total} pengguna
              </span>
            )}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block xl:hidden">
        <div className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <article
              key={user.uuid}
              className="p-4 sm:p-5 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={(e) => handleRowClick(user.uuid, e)}
              role="button"
              tabIndex={0}
              aria-label={`Pengguna ${user.fullname}`}
            >
              {/* Mobile Layout */}
              <div className="space-y-4">
                {/* Header Row - Avatar + Name + Role */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">
                      {user.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">
                          {user.fullname}
                        </h4>
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(
                            user.role?.name
                          )}`}
                        >
                          {getRoleIcon(user.role?.name)}
                          {user.role?.name || "No role"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Section - Better grid layout */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white rounded-md flex-shrink-0">
                          <Mail className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Email
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white rounded-md flex-shrink-0">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Bergabung
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(user.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetail(user.uuid);
                    }}
                    className="inline-flex items-center justify-center px-3 py-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium min-h-[40px]"
                    aria-label="Lihat detail pengguna"
                  >
                    <Eye className="h-4 w-4 mr-1.5" />
                    Detail
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit && onEdit(user);
                    }}
                    className="inline-flex items-center justify-center px-3 py-2 text-primary hover:text-primary-hover bg-primary-light hover:bg-primary-light/80 rounded-lg transition-colors text-sm font-medium min-h-[40px]"
                    aria-label="Edit pengguna"
                  >
                    <Edit className="h-4 w-4 mr-1.5" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete && onDelete(user.uuid);
                    }}
                    className="inline-flex items-center justify-center px-3 py-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium min-h-[40px]"
                    aria-label="Hapus pengguna"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Hapus
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden xl:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informasi Pengguna
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Kontak
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Peran
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Tanggal Bergabung
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user.uuid}
                  onClick={(e) => handleRowClick(user.uuid, e)}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow">
                          <span className="text-white font-semibold text-sm">
                            {user.fullname?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullname}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <span className="mr-1 text-gray-400">@</span>
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <div className="p-1.5 bg-gray-100 rounded mr-3">
                        <Mail className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(
                        user.role?.name
                      )}`}
                    >
                      {getRoleIcon(user.role?.name)}
                      {user.role?.name || "Tidak ada role"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-gray-100 rounded mr-3">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatDate(user.created_at)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Member sejak
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetail(user.uuid);
                        }}
                        className="inline-flex items-center p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Lihat detail pengguna"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(user);
                        }}
                        className="inline-flex items-center p-2 text-primary hover:text-primary-hover bg-primary-light hover:bg-primary-light/80 rounded-lg transition-colors"
                        title="Edit pengguna"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(user.uuid);
                        }}
                        className="inline-flex items-center p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Hapus pengguna"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashUser;
