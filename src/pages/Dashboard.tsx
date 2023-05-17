import Background from '../assets/images/fisherman.jpg'
import DataTable from '../components/DataTable'

function Dashboard() {
    return (
        <div
          style={{ backgroundImage: `url(${ Background })`}}
          className="flex justify-center bg-cover bg-fixed"
        >
          <div className='flex flex-col justify-center items-center h-screen md:mt-8'>
            <h4 className='p-3 md:p-5 text-slate-100 rounded text-2xl md:text-4xl border bg-black bg-opacity-70 mb-3 md:mb-5'>
              Welcome to your Dashboard
            </h4>
            <div className='flex flex-col justify-center items-center h-screen md:mb-8 lg:mb-8 overflow-x-auto'>
            <DataTable />
            </div>
          </div> 
        </div>
      )
}

export default Dashboard
