import { HajjReady } from '@/components/ready-hajj'
import { HajjReadyB2B } from '@/components/ready-hajj-b2b';

function IndexPage() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
     <div className='col-span-3 grid md:grid-cols-2 grid-cols-1 justify-center items-center'>
     <div className="p-4 bg-white rounded shadow">
        <h2 className="text-base font-bold">مهام منصة جاهز حج (المجلس التنسيقي)</h2>
        <div className='flex gap-2 mt-4 items-center justify-center'>
          <HajjReady />
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-base font-bold">مهام منصة جاهز حج (المجلس التنسيقي)</h2>
        <div className='flex gap-2 mt-4 items-center justify-center'>
          <HajjReadyB2B />
        </div>
      </div>
     </div>
    </div>
  )
}
IndexPage.tab = "home"
export { IndexPage };
