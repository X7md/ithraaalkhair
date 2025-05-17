import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { Clock } from './Clock'
import { NavLink, useNavigate } from "react-router-dom"
import React from "react"

const TABS = [
  { id: 'home', label: 'الصفحة الرئيسية', path: '/' },
  // { id: 'survey', label: 'الاستمارة', path: '/survey' },
  { id: 'nusuk-imtithal', label: 'نسك امتثال', path: '/nusuk-imtithal' },
  {id: "", label: 'مؤشرات الأداء اليومية',path:'https://app.powerbi.com/view?r=eyJrIjoiYTIyNDE0YzctMDc5Ny00NTk3LTkxYjktYTMzYTY1MDI0M2ZmIiwidCI6ImQxZGJlNzlhLWYwMWUtNGFjYy04ZmJmLTAwOTIzZmFmZjQyYyIsImMiOjl9'}
]

export function Layout({ activeTab = 'home', children }) {
  const navigate = useNavigate();
  const isLoginPage = window.location.pathname === '/login';
  
  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  const triggerRef = React.useRef()

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      triggerRef.current?.click()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative flex min-h-screen w-full" dir="rtl">
        <Sidebar side="right" className="w-64 flex-shrink-0">
          <SidebarHeader>
            <div className="flex flex-col items-center gap-3 justify-start mt-6 px-2">
              <img src="/logo.svg" alt="Logo" className="h-8" />
              <h1 className="ml-2 text-lg font-bold text-secondary">إدارة الجودة</h1>
              {/* date of today (in hajri using javascript intl api), and reactive clock  */}
                <div className="text-sm text-gray-500">
                    {new Intl.DateTimeFormat('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    }).format(new Date())} 
                </div>
                <Clock />
            </div>
          </SidebarHeader>
          <SidebarContent className="relative">
            <div className="relative flex z-10 flex-col gap-2 p-4 rounded-sm">
              <div className="flex gap-2 flex-col justify-between h-fit">
                <div className="flex flex-col gap-2">
                {TABS.map(tab => (
                <NavLink to={tab.path} target={tab.path.startsWith("http") &&"_blank"} key={tab.id} onClick={handleNavClick}>
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className="w-full cursor-pointer flex justify-items-center items-center"
                  >
                    {tab.label}
                    {(tab.path.startsWith("http://") || tab.path.startsWith("https://") ) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6z"></path>
                        </svg>
                    )}
                  </Button>
                </NavLink>
                 ))}
                </div>
                 <hr className="border-gray-300 my-2" />
              </div>
              <div className="bg-slate-100 absolute w-full h-full left-0 right-0 top-0 opacity-85 -z-10 "></div>
            </div>
            <div className="text-center absolute bottom-0 right-0 left-0 p-5 w-full z-10">
                  <span dir="ltr" className="text-sm text-gray-500">
                    Powered by: 
                  </span>
                  <a href="https://mushkhbat.com">
                  <img src="/mushkhbat.svg" className="max-h-[30px] w-full invert" />
                  </a>
                 </div>
            <img className="left-0 opacity-20 object-cover h-full w-full absolute" src="/pattern.svg" />
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 p-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger ref={triggerRef} className="bg-secondary text-white hover:!bg-primary focus:bg-primary focus-within:bg-primar" />
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              تسجيل خروج
            </Button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
