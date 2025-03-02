"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import Image1 from "./assets/img1 (1).jpeg";
import Image2 from "./assets/ai.jpg";
import Image3 from "./assets/img1 (3).jpeg";
import Image4 from "./assets/ai2.jpeg";
import Logo from "./assets/logo2.png";
import "./sass/Auth.scss";
import { registerUser, loginUser } from "./services/authService";
import { useRouter } from 'next/navigation';

interface ImageType {
  imageUrl: StaticImageData;
  alt: string;
  caption: string;
}

function AuthPage() {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const Images: ImageType[] = [
    {
      imageUrl: Image1,
      alt: "LoginImage1",
      caption:
        "At Fusion-Pic we allow you to generate the best quality images for your projects. Our images are free to use and you can download them in high resolution.",
    },
    {
      imageUrl: Image2,
      alt: "LoginImage2",
      caption:
        "Our powerful AI features allow us to deliver high-quality images with minimal effort.",
    },
    {
      imageUrl: Image3,
      alt: "LoginImage3",
      caption:
        "Experience the magic of Fusion-Pic and create your dream images with our intuitive and easy-to-use interface.",
    },
    {
      imageUrl: Image4,
      alt: "LoginImage4",
      caption:
        "Don't forget to share your creations with the world and unlock new opportunities.",
    },
  ];

  // Rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [Images.length]);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const strengthScore = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;

    if (strengthScore <= 2) {
      setPasswordStrength("weak");
    } else if (strengthScore <= 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  }, [password]);

  // Reset form states when switching between login and signup
  useEffect(() => {
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
    if (isLogin) {
      setName("");
    }
  }, [isLogin]);

  const validateForm = () => {
    // Reset error
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    // For signup, check additional validations
    if (!isLogin) {
      if (!name.trim()) {
        setError("Please enter your name");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return false;
      }

      if (passwordStrength === "weak") {
        setError("Please use a stronger password with uppercase, lowercase, numbers and special characters");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (!isLogin) {
        // Signup flow
        await registerUser({ name, email, password });
        setSuccess("Account created successfully! Redirecting to dashboard...");
        
        // Delay redirect to show success message
        setTimeout(() => {
          router.push('/Generate');
        }, 1500);
      } else {
        // Login flow
        await loginUser({ email, password });
        setSuccess("Login successful! Redirecting You 😊...");
        
        // Delay redirect to show success message
        setTimeout(() => {
          router.push('/Generate');
        }, 1000);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    // Implement forgot password logic or redirect to password reset page
    console.log("Forgot password clicked");
    router.push('/forgot-password');
  };

  // Get strength indicator color
  const getStrengthColor = () => {
    if (passwordStrength === "weak") return "bg-red-500";
    if (passwordStrength === "medium") return "bg-yellow-500";
    if (passwordStrength === "strong") return "bg-green-500";
    return "bg-gray-700";
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left side - Image Carousel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div className="logo-image absolute z-10 flex flex-row items-center gap-3 sm:gap-6 w-full max-w-[250px] p-3 sm:p-4">
          <Image
            src={Logo}
            alt="logo"
            width={40}
            height={40}
            className="sm:w-[50px] sm:h-[50px]"
          />
          <div className="para text-center">
            <p className="font-bold text-xl sm:text-2xl">Fusion-Pic</p>
          </div>
        </div>
        {Images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === activeImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.imageUrl}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="brightness-75"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-8 text-white z-20">
                <p className="text-lg font-light leading-relaxed">
                  {image.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image src={Logo} alt="Fusion-Pic Logo" width={48} height={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Fusion-Pic</h1>
            <p className="text-gray-400">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                  placeholder="Your name"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                placeholder="name@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              {!isLogin && password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Password strength:</span>
                    <span className="text-xs font-medium capitalize" style={{
                      color: passwordStrength === "weak" ? "#f87171" : 
                             passwordStrength === "medium" ? "#facc15" : 
                             passwordStrength === "strong" ? "#4ade80" : "#9ca3af"
                    }}>
                      {passwordStrength || "none"}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                      style={{ 
                        width: passwordStrength === "weak" ? "33%" : 
                               passwordStrength === "medium" ? "66%" : 
                               passwordStrength === "strong" ? "100%" : "0%" 
                      }}
                    ></div>
                  </div>
                  {passwordStrength === "weak" && (
                    <p className="text-xs text-red-400 mt-1">
                      Use uppercase, lowercase, numbers, and special characters
                    </p>
                  )}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 border ${
                    confirmPassword && password !== confirmPassword 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-lg text-white placeholder-gray-500`}
                  placeholder="••••••••"
                  required={!isLogin}
                  disabled={isLoading}
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign in" : "Create Account"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-medium text-indigo-400 hover:text-indigo-300"
              disabled={isLoading}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;