export default function LoginPage() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
  