import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Profile() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Please login
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500">
              Full Name
            </p>
            <p className="font-semibold text-lg">
              {user.fullName}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>
            <p className="font-semibold text-lg">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Role
            </p>
            <p className="font-semibold text-lg capitalize">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              User ID
            </p>
            <p className="font-semibold text-sm break-all">
              {user._id}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Account Summary
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-gray-500">Role</p>
            <p className="font-bold">
              {user.role}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">Status</p>
            <p className="font-bold text-green-600">
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;