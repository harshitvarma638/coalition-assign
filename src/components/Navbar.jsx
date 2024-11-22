import {React} from 'react';
import { Settings,EllipsisVertical,House, Users, Calendar, MessageSquare, CreditCard } from 'lucide-react';

const Navbar = () => {
    return (
        <div className='flex flex-row justify-between rounded-3xl m-4 mb-0 bg-white'>
        <img src="./TestLogo.svg" alt='test-logo' className='ml-2 p-1'></img>
        <div className='flex flex-row gap-5 items-center text-sm'>
          <p className='flex flex-row items-center px-4 py-2 rounded-3xl'><House className='mr-2'/> Overview</p>
          <p className='flex flex-row items-center px-4 py-2 rounded-3xl bg-[#01f0d0]'><Users className='mr-2'/>Patients</p>
          <p className='flex flex-row items-center px-4 py-2 rounded-3xl'><Calendar className='mr-2'/>Schedule</p>
          <p className='flex flex-row items-center px-4 py-2 rounded-3xl'><MessageSquare className='mr-2'/>Message</p>
          <p className='flex flex-row items-center px-4 py-2 rounded-3xl'><CreditCard className='mr-2'/>Transactions</p>
        </div>
        <div className='flex flex-row items-center'>
          <img src="./profile-picture.png" alt="profile-picture" className='rounded-full w-10 h-10 m-1'></img>
          <div className='flex flex-col'>
            <p className='text-sm font-bold'>Dr. Jose Simmons</p>
            <p className='text-sm font-light'>General Practitioner</p>
          </div>
          <p className='mx-3 my-2'>|</p>
          <div className='flex flex-row mr-2'>
            <Settings size={24} />
            <EllipsisVertical size={24} />
          </div>
        </div>
      </div>
    );
}

export default Navbar;