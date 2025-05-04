import { HajjReady } from '@/components/ready-hajj'

function IndexPage() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-base font-bold">مهام منصة جاهز حج (المجلس التنسيقي)</h2>
        <div className='flex gap-2 mt-4'>
          <HajjReady />
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
      </div>
    </div>
  )
}
IndexPage.tab = "home"
export { IndexPage };
