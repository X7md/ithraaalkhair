import { useTime } from '@/hooks/useTime'

export function Clock() {
  const time = useTime()
  
  return (
    <div className="text-sm text-gray-500 font-black">
      {time.toLocaleTimeString('ar-SA')}
    </div>
  )
}
