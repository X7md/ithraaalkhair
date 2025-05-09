import { useState, useEffect } from 'react';
import { HajjReady } from '@/components/ready-hajj'
import { HajjReadyB2B } from '@/components/ready-hajj-b2b';

function IndexPage() {
  const [tasksData, setTasksData] = useState(null);
  const [taskDetailsData, setTaskDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, detailsResponse] = await Promise.all([
          fetch("/data/tasks.json"),
          fetch("/data/taskDetails.json")
        ]);
        
        const [tasksJson, detailsJson] = await Promise.all([
          tasksResponse.json(),
          detailsResponse.json()
        ]);

        setTasksData(tasksJson);
        setTaskDetailsData(detailsJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const b2cData = tasksData?.filter(itm => itm.business_model === 'B2C') || [];
  const b2bData = tasksData?.filter(itm => itm.business_model === 'B2B') || [];

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
     <div className='col-span-3 grid md:grid-cols-2 grid-cols-1 justify-center items-center'>
     <div className="p-4 bg-white rounded shadow">
        <h2 className="text-base font-bold">مهام B2C</h2>
        <div className='flex gap-2 mt-4 items-center justify-center'>
          <HajjReady data={b2cData} taskDetails={taskDetailsData} />
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-base font-bold">مهام B2B</h2>
        <div className='flex gap-2 mt-4 items-center justify-center'>
          <HajjReadyB2B data={b2bData} taskDetails={taskDetailsData} />
        </div>
      </div>
     </div>
    </div>
  )
}
IndexPage.tab = "home"
export { IndexPage };
