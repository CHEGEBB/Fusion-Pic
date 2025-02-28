"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Github, Mail, ArrowRight } from "lucide-react";
import Image1 from "./assets/img1 (1).jpeg";
import Image2 from "./assets/ai.jpg";
import Image3 from "./assets/img1 (3).jpeg";
import Image4 from "./assets/ai2.jpeg";
import Logo from "./assets/logo2.png";
import "./sass/Auth.scss";

interface ImageType {
  imageUrl: StaticImageData;
  alt: string;
  caption: string;
}

function AuthPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log(isLogin ? "Logging in..." : "Signing up...", {
      email,
      password,
      name,
    });
  };

  const handleGoogleLogin = () => {
    // Implement Google login
    console.log("Google login");
  };

  const handleGithubLogin = () => {
    // Implement Github login
    console.log("Github login");
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

          <div className="space-y-4 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-300"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center w-full gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
            >
              <Github size={18} />
              Continue with GitHub
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

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
              />
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
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required={!isLogin}
                />
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
            >
              {isLogin ? "Sign in" : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-medium text-indigo-400 hover:text-indigo-300"
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
