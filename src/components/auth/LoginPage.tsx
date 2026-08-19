"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import { LogIn } from "lucide-react";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(login(name.trim()));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-bg-base p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-border-base bg-white dark:bg-bg-surface p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-base/10">
            <LogIn size={32} className="text-accent-base" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-text-primary">
            Welcome to PGAGI DEMO
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-text-secondary">
            Please enter your name to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 dark:text-text-primary mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-200 dark:border-border-base bg-slate-50 dark:bg-bg-base py-3 px-4 text-sm text-slate-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-base/50 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full rounded-lg bg-slate-900 dark:bg-accent-base py-3 px-4 text-sm font-semibold text-white dark:text-bg-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
