import {React, useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import LineCharts from './components/LineCharts'; 
import './App.css';
import { SearchIcon, Ellipsis, Download, Calendar, Phone, ShieldCheck, ArrowDownWideNarrow, MoveDown, ChevronDown } from 'lucide-react';

const encrypt = () => {
  const username = 'coalition';
  const password = 'skills-test';

  const combined_creds = `${username}:${password}`;

  return btoa(combined_creds);
}

function App() {
  const [data,setData] = useState(null);
  

  useEffect(() =>{
    const fetchData = async () => {
      const token = encrypt();
      await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then(function (response) {
        if(response.ok){
          return response.json();
        }
        throw response;
      }).then(function(data){
        setData(data);
      }).catch(function(error){
        console.error(error);
      });
    }
    fetchData();
  }, []);


  return (
    <div className='h-flex flex-col'>
      <Navbar className='flex-shrink-0'/>

      <div className='grid grid-cols-5 gap-5 my-5 mx-4 overflow-hidden' style={{gridTemplateColumns: "1fr 2.75fr 1.25fr",alignItems: "stretch"}}>
        <div className='bg-white rounded-2xl h-[975px]'>
          <div className='justify-between flex flex-row m-3 items-center'>
            <p className='text-2xl font-semibold text-[#072635]'>Patients</p>
            <SearchIcon/>
          </div>
          <div className="overflow-y-auto h-[calc(975px-64px)] custom-scrollbar">
            {data && data.map((item) => {
              return (
                <div key={item.id} className='flex flex-row gap-2 m-3 items-center'>
                  <img src={`${item.profile_picture}`} alt="DP" className='rounded-full h-12 w-12'/>
                  <div className='flex flex-row justify-between items-center w-full'>
                    <div>
                      <p className='text-sm font-bold'>{item.name}</p>
                      <p className='text-sm font-light'>{item.gender} {item.age}</p>
                    </div>
                    <Ellipsis className='m-1'/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='overflow-hidden gap-5'>
          <div className='flex flex-col bg-white rounded-2xl'>
            <p className='text-2xl font-bold mx-5 mb-4 mt-2'>Diagnosis History</p>
            <div>
              <div className='grid grid-cols-3 rounded-2xl bg-[#f4f0fe] mx-5 my-1'>
                <div className='col-span-2'>
                  <div className='flex flex-row justify-between m-4'>
                    <p>Blood Pressure</p>
                    <p className='flex flex-row'>Last 6 months <ChevronDown/></p>
                  </div>
                  <div className='m-4'>
                    {data && <LineCharts diagnosisHistory={data[0].diagnosis_history}/>}
                  </div>
                </div>
                <div className='col-span-1'>
                  <div className='m-5 mb-3'>
                    <p className='flex flex-row items-center'><div class="w-4 h-4 rounded-full bg-[rgb(255,99,132)] mr-2"></div> Systolic</p>
                    <p className='font-xl my-2'>160</p>
                    <p className='flex flex-row items-center'><img src="./ArrowUp.svg" alt="arrow-down" className='mr-1'></img>Higher than Average</p>
                  </div>
                  <p className='flex items-center justify-center font-extralight text-gray-400'>______________________________</p>
                  <div className='m-5'>
                    <p className='flex flex-row items-center'><div class="w-4 h-4 rounded-full bg-[rgb(54,162,235)] mr-2"></div>Diastolic</p>
                    <p className='font-xl my-2'>78</p>
                    <p className='flex flex-row items-center'><img src="./ArrowDown.svg" alt="arrow-down" className='mr-1'></img>Lower than Average</p>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4 mx-5 my-3'>
                <div className='col-span-1 flex-col items-start rounded-2xl bg-[#e0f3fa]'>
                  <img src="./respiratory-rate.svg" alt="respiratory-img" className='h-30 w-30 my-4 mx-5'/>
                  <p className='mx-5'>Respiratory Rate</p>
                  <p className='font-extrabold text-2xl mx-5'>{data && data[0].diagnosis_history[0].respiratory_rate.value} bpm</p>
                  <p className='my-4 mx-5'>Normal</p>
                </div>
                <div className='col-span-1 flex-col items-start rounded-2xl bg-[#ffe6e9]'>
                  <img src="./temperature.svg" alt="temperature" className='h-30 w-30 m-4'/>
                  <p className='mx-5'>Temperature</p>
                  <p className='font-extrabold text-2xl mx-5'>{data && data[0].diagnosis_history[0].temperature.value} F</p>
                  <p className='mt-4 mx-5'>Normal</p>
                </div>
                <div className='col-span-1 flex-col items-start rounded-2xl bg-[#ffe6f1]'>
                  <img src="./HeartBPM.svg" alt="heartbeat" className='h-30 w-30 m-4'/>
                  <p className='mx-5'>Heart Rate</p>
                  <p className='font-extrabold text-2xl mx-5'>{data && data[0].diagnosis_history[0].heart_rate.value} bpm</p>
                  <p className='flex flex-row items-center my-4 mx-5'><img src="./ArrowDown.svg" alt="arrow-down" className='mr-1'></img>Lower than average</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-2xl mt-4 w-full">
            <p className="text-2xl font-extrabold mt-4 mx-4">Diagnostic List</p>

            <table className="m-4 mb-0 table-auto w-auto rounded-3xl bg-gray-100">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left w-1/4">Problem/Diagnosis</th>
                  <th className="px-4 py-2 text-left w-1/2">Description</th>
                  <th className="px-4 py-2 text-left w-1/4">Status</th>
                </tr>
              </thead>
            </table>

            <div style={{ height: '190px', overflowY: 'auto' }} className="m-4 mt-0 custom-scrollbar">
              <table className="table-auto w-full">
                <tbody>
                  {data && data[5].diagnostic_list.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 w-1/4">{item.name}</td>
                      <td className="px-4 py-2 w-1/2">{item.description}</td>
                      <td className="px-4 py-2 w-1/4">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div>
          <div className='flex flex-col bg-white rounded-2xl overflow-auto mb-4'>
            <div className='flex flex-col items-center mt-4 mb-2'>
              <img src="./Main_DP.png" alt="profile-picture" className='h-40 w-40 rounded-full'></img>
              <p className='m-2 text-2xl font-extrabold'>Jessica Taylor</p>
            </div>
            <div>
                <div className='flex flex-row mb-4'>
                  <div className='p-1 m-1 mx-3 rounded-full bg-[#f6f7f8]'>
                    <Calendar className='h-7 w-7 p-1'/>
                  </div>
                  <div className='mx-1'>
                    <p className='text-sm font-light'>Date of Birth</p>
                    <p className='text-sm font-bold'>August 23, 1996</p>
                  </div>
                </div>

                <div className='flex flex-row my-4'>
                  <div className='m-1 mx-3 rounded-full'>
                    <img src="./femaleIcon.svg" alt="female-icon" className='h-9 w-9 rounded-full'/>
                  </div>
                  <div className='mx-1'>
                    <p className='text-sm font-light'>Gender</p>
                    <p className='text-sm font-bold'>Female</p>
                  </div>
                </div>

                <div className='flex flex-row my-4'>
                  <div className='p-1 m-1 mx-3 rounded-full bg-[#f6f7f8]'>
                    <Phone className='h-7 w-7 p-1'/>
                  </div>
                  <div className='mx-1'>
                    <p className='text-sm font-light'>Contact Info</p>
                    <p className='text-sm font-bold'>(415) 555-5678</p>
                  </div>
                </div>

                <div className='flex flex-row my-4'>
                  <div className='p-1 m-1 mx-3 rounded-full bg-[#f6f7f8]'>
                    <Phone className='h-7 w-7 p-1'/>
                  </div>
                  <div className='mx-1'>
                    <p className='text-sm font-light'>Emergency Contacts</p>
                    <p className='text-sm font-bold'>(415) 555-5678</p>
                  </div>
                </div>

                <div className='flex flex-row mt-4'>
                  <div className='p-1 m-1 mx-3 rounded-full bg-[#f6f7f8]'>
                    <ShieldCheck className='h-7 w-7 p-1'/>
                  </div>
                  <div className='mx-1'>
                    <p className='text-sm font-light'>Insurance Provider</p>
                    <p className='text-sm font-bold'>Sunrise Health Insurance</p>
                  </div>
                </div>
            </div>
            <div className='flex justify-center m-2'>
              <button className='bg-[#01f0d0] text-black rounded-3xl w-auto m-2 px-8 py-2'>Show all information</button>
            </div>
          </div>
          <div className='bg-white rounded-2xl'>
            <p className='text-2xl font-bold m-4 pt-4'>Lab Results</p>
            <div className='flex flex-col m-3 h-[305px] overflow-y-auto custom-scrollbar'>
              {data && data[0].lab_results.map((item) => {
                return (
                  <div key={item.id} className='flex justify-between p-2 m-1'>
                    <p className='mx-2 text-sm'>{item}</p>
                    <Download/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
