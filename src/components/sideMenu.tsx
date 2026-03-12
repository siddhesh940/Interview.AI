"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Bell, Brain, Briefcase, Code, FileCheck, FileText, Gamepad2, MapPin, Mic, PlayCircle, Sparkles, Speech, UserCheck, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SideMenu() {
  const rawPathname = usePathname();
  const pathname = rawPathname || '';
  const router = useRouter();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { isCollapsed, isMobile, isMobileOpen, setMobileOpen } = useSidebar();

  // Close mobile sidebar on navigation
  const handleNav = (path: string) => {
    router.push(path);
    if (isMobile) setMobileOpen(false);
  };

  useEffect(() => {
    // Fetch unread notification count
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch('/api/notifications?unread=true');
        if (response.ok) {
          const data = await response.json();
          setUnreadNotifications(data.unreadCount || 0);
        }
      } catch (error) {
        console.error('Failed to fetch notification count:', error);
      }
    };

    fetchNotificationCount();
    
    // Poll for new notifications every 5 minutes
    const interval = setInterval(fetchNotificationCount, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const sidebarVisible = isMobile ? isMobileOpen : !isCollapsed;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[15] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div 
        className={`z-[20] bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 pb-24 fixed top-[64px] left-0 h-[calc(100vh-64px)] overflow-y-auto transition-all duration-300 ease-in-out w-72 ${
          sidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
      <div className="flex flex-col gap-1">
        <div className="flex flex-col justify-between gap-2">
          
          {/* ---- Interviews ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.endsWith("/dashboard") || pathname.includes("/interviews")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/dashboard")}
          >
            <PlayCircle className="font-thin mr-2" />
            <p className="font-medium">Interviews</p>
          </div>

          {/* ---- Interviewers ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.endsWith("/interviewers")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/dashboard/interviewers")}
          >
            <Speech className="font-thin mr-2" />
            <p className="font-medium">Interviewers</p>
          </div>

          {/* ---- Soft Skills ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/soft-skills")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/soft-skills")}
          >
            <Mic className="font-thin mr-2" />
            <p className="font-medium">Soft Skills</p>
          </div>

          {/* ---- HR Interview Coach ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/hr-interview-coach")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/hr-interview-coach")}
          >
            <UserCheck className="font-thin mr-2" />
            <div className="flex flex-col">
              <p className="font-medium">HR Interview Coach</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">HR Round Preparation</p>
            </div>
          </div>

          {/* ---- Interview Resource Hub ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/interview-resources")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/interview-resources")}
          >
            <FileText className="font-thin mr-2" />
            <p className="font-medium">Interview Resource Hub</p>
          </div>

          {/* ---- Games ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/games")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/games")}
          >
            <Gamepad2 className="font-thin mr-2" />
            <p className="font-medium">Games</p>
          </div>

          {/* ---- Aptitude Arena ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/aptitude")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/aptitude")}
          >
            <Brain className="font-thin mr-2" />
            <p className="font-medium">Aptitude Arena</p>
          </div>

          {/* ---- Dream Company Station ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/dream-company")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/dream-company")}
          >
            <Briefcase className="font-thin mr-2" />
            <p className="font-medium">Dream Company Station</p>
          </div>

          {/* ---- Placement Drives ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors relative ${
              pathname.includes("/placement-drives")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/dashboard/placement-drives")}
          >
            <MapPin className="font-thin mr-2" />
            <div className="flex flex-col flex-1">
              <p className="font-medium">Placement Drives</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Live Opportunities</p>
            </div>
            {unreadNotifications > 0 && (
              <div className="flex items-center">
                <Bell className="w-4 h-4 mr-1 text-orange-500 dark:text-orange-400" />
                <span className="bg-orange-500 dark:bg-orange-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              </div>
            )}
          </div>

          {/* ---- Resume Builder ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/resume-builder")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/resume-builder")}
          >
            <FileCheck className="font-thin mr-2" />
            <p className="font-medium">Resume Builder</p>
          </div>

          {/* ---- Skill Autofill ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/skill-autofill")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/skill-autofill")}
          >
            <Sparkles className="font-thin mr-2" />
            <p className="font-medium">Skill Autofill</p>
          </div>

          {/* ---- Time Machine ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/time-machine")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/time-machine")}
          >
            <Zap className="font-thin mr-2" />
            <div className="flex flex-col">
              <p className="font-medium">🕒 Time Machine</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Future Self Predictor</p>
            </div>
          </div>

          {/* ---- TechPrep Engine ---- */}
          <div
            className={`flex flex-row px-6 py-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
              pathname.includes("/technical-practice")
                ? "bg-indigo-200 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200"
                : "bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-200"
            }`}
            onClick={() => handleNav("/technical-practice")}
          >
            <Code className="font-thin mr-2" />
            <div className="flex flex-col">
              <p className="font-medium">💻 TechPrep Engine</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Technical Interview Preparation</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default SideMenu;
