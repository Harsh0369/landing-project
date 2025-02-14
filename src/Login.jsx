import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { loginSchema, signupSchema } from "../lib/validations/auth";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onLogin = async (data) => {
    try {
      console.log("Login data:", data);
      toast.success("Successfully logged in!");
      setUser({ id: "1", fullName: "John Doe", email: data.email });
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const onSignup = async (data) => {
    try {
      console.log("Signup data:", data);
      toast.success("Account created successfully!");
      setUser({ id: "1", fullName: data.fullName, email: data.email });
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-400 mt-2">
              {isLogin
                ? "Sign in to your account"
                : "Sign up for a new account"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? (
                <form
                  onSubmit={handleLoginSubmit(onLogin)}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...loginRegister("email")}
                      className="input-field"
                    />
                    {loginErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...loginRegister("password")}
                        className="input-field pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Sign In
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleSignupSubmit(onSignup)}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...signupRegister("fullName")}
                      className="input-field"
                    />
                    {signupErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...signupRegister("email")}
                      className="input-field"
                    />
                    {signupErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...signupRegister("password")}
                        className="input-field pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {signupErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.password.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Create Account
                  </button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
