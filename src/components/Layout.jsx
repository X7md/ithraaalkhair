import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { Clock } from './Clock'
import { NavLink } from "react-router-dom"
import React from "react"

const TABS = [
  { id: 'home', label: 'الصفحة الرئيسية', path: '/' },
  { id: 'survey', label: 'الاستمارة', path: '/survey' },
]

export function Layout(
    {
     //eslint-disable-next-line react/prop-types
     activeTab = 'home', 
     //eslint-disable-next-line react/prop-types
     children 
    }) {
  const triggerRef = React.useRef()

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      triggerRef.current?.click()
    }
  }

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
                <NavLink to={tab.path} key={tab.id} onClick={handleNavClick}>
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className="w-full cursor-pointer"
                  >
                    {tab.label}
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
          <div className="flex items-center gap-2 p-4 border-b sticky top-0 bg-white z-10">
            <SidebarTrigger ref={triggerRef} className="bg-secondary text-white hover:!bg-primary focus:bg-primary focus-within:bg-primar" />
          </div>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
