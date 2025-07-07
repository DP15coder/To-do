import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import { VALIDATION_REASONS, VALIDATION_MESSAGES } from "../../utils/constant";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const nameCheck = validateName(name);
    if (!nameCheck.valid) {
      switch (nameCheck.reason) {
        case VALIDATION_REASONS.EMPTY:
          setError(VALIDATION_MESSAGES.NAME_EMPTY);
          break;
        case VALIDATION_REASONS.NOT_TWO_PARTS:
          setError(VALIDATION_MESSAGES.NAME_NOT_TWO_PARTS);
          break;
        case VALIDATION_REASONS.INVALID_FIRST:
          setError(VALIDATION_MESSAGES.NAME_INVALID_FIRST);
          break;
        case VALIDATION_REASONS.INVALID_LAST:
          setError(VALIDATION_MESSAGES.NAME_INVALID_LAST);
          break;
        default:
          setError(VALIDATION_MESSAGES.NAME_INVALID);
      }
      setLoading(false);
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      switch (emailCheck.reason) {
        case VALIDATION_REASONS.EMPTY:
          setError(VALIDATION_MESSAGES.EMAIL_EMPTY);
          break;
        case VALIDATION_REASONS.INVALID:
          setError(VALIDATION_MESSAGES.EMAIL_INVALID);
          break;
        default:
          setError(VALIDATION_MESSAGES.EMAIL_GENERIC);
      }
      setLoading(false);
      return;
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      switch (passwordCheck.reason) {
        case VALIDATION_REASONS.EMPTY:
          setError(VALIDATION_MESSAGES.PASSWORD_EMPTY);
          break;
        case VALIDATION_REASONS.WEAK:
          setError(VALIDATION_MESSAGES.PASSWORD_WEAK);
          break;
        default:
          setError(VALIDATION_MESSAGES.PASSWORD_INVALID);
      }
      setLoading(false);
      return;
    }

    const confirmCheck = validateConfirmPassword(password, confirmPassword);
    if (!confirmCheck.valid) {
      switch (confirmCheck.reason) {
        case VALIDATION_REASONS.EMPTY:
          setError(VALIDATION_MESSAGES.CONFIRM_EMPTY);
          break;
        case VALIDATION_REASONS.MISMATCH:
          setError(VALIDATION_MESSAGES.CONFIRM_MISMATCH);
          break;
        default:
          setError(VALIDATION_MESSAGES.CONFIRM_FAILED);
      }
      setLoading(false);
      return;
    }
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Create account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to organize your todos
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create account"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
