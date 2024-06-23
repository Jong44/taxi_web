import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/global/adminlayout';
import CardStatus from '@/components/global/cardstatus';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';

const chartData = [
  { name: 'Pegguna', value: 100, color: "bg-gradient-to-tr from-[#834D9B] to-[#D04ED6]", width: 20 },
  { name: "Dokter", value: 100, color: "bg-gradient-to-tr from-[#FC5286] to-[#FBAAA2]", width: 10 },
  { name: "Member", value: 100, color: "bg-gradient-to-tr from-[#834D9B] to-[#D04ED6]", width: 25 },
  { name: "Tes Kesehatan Mental", value: 100, color: "bg-gradient-to-tr from-[#FC5286] to-[#FBAAA2]", width: 45 },
  { name: "Podcast", value: 100, color: "bg-gradient-to-tr from-[#56AB2F] to-[#A8E063]", width: 30 },
  { name: "Artikel", value: 100, color: "bg-gradient-to-tr from-[#F7971E] to-[#FFD200]", width: 12 },
  { name: "Meditasi", value: 100, color: "bg-gradient-to-tr from-[#56AB2F] to-[#A8E063]", width: 77 },
  { name: "Transaksi", value: 100, color: "bg-gradient-to-tr from-[#F7971E] to-[#FFD200]", width: 17 }
];

const Index = () => {
  const chartLineFillRefs = useRef(null);
  const chartBarRefs = useRef(null);
  const chartLineRefs = useRef(null);
  
  const chartInstances = useRef([]);

  const [data, setData] = useState(chartData);

  const showAlert = (action) => {
    const confirmText = action === 'accept' ? 'Yes, accept it!' : 'Yes, reject it!';
    const confirmMessage = `The dokter has been ${action}ed.`;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Confirmed!',
          confirmMessage,
          'success'
        );
      }
    });
  };

  const createChart = (ctx, type, labels, datasets) => {
    return new Chart(ctx, {
      type,
      data: {
        labels,
        datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  useEffect(() => {
    const chartLineFillCtx = chartLineFillRefs.current.getContext('2d');
    const chartBarCtx = chartBarRefs.current.getContext('2d');
    const chartLineCtx = chartLineRefs.current.getContext('2d');

    if (chartInstances.current.length > 0) {
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];
    }

    chartInstances.current.push(createChart(chartLineFillCtx, 'line', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [
      {
        label: 'Total Dokter',
        data: [10, 20, 30, 10, 50, 60],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Total Member',
        data: [5, 0, 15, 20, 65, 30],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      }
    ]));

    chartInstances.current.push(createChart(chartBarCtx, 'bar', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [
      {
        label: 'Total Dokter',
        data: [10, 20, 30, 50, 50, 60],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Member',
        data: [5, 10, 15, 20, 25, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]));

    chartInstances.current.push(createChart(chartLineCtx, 'line', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [
      {
        label: 'Total Dokter',
        data: [10, 20, 30, 40, 10, 60],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Total Member',
        data: [5, 10, 15, 20, 25, 20],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
      }
    ]));

    return () => {
      chartInstances.current.forEach(chart => chart.destroy());
    };
  }, []);

  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/c3cf8af875.js" crossOrigin="anonymous"></script>
        <title>Admin</title>
      </Head>
      <AdminLayout>
        <div className='py-8 px-7'>
          <h1 className='text-xl font-bold'>Dashboard</h1>
          <div className='grid grid-cols-4 gap-4 mt-5'>
            {data.map((item, index) => (
              <CardStatus key={index} title={item.name} value={item.value} color={item.color} width={item.width} />
            ))}
          </div>
          <div className='grid grid-cols-3 gap-4 mt-6'>
            <div className='w-full bg-white px-6 py-4 rounded-md shadow-md'>
              <p className='text-[#3A405B] font-medium text-sm'>Total Dokter</p>
              <canvas ref={chartLineFillRefs} />
            </div>
            <div className='w-full bg-white px-6 py-4 rounded-md shadow-md'>
              <p className='text-[#3A405B] font-medium text-sm'>Total Member</p>
              <canvas ref={chartBarRefs} />
            </div>
            <div className='w-full bg-white px-6 py-4 rounded-md shadow-md'>
              <p className='text-[#3A405B] font-medium text-sm'>Total Transaksi</p>
              <canvas ref={chartLineRefs} />
            </div>
          </div>
          <div className='w-full mt-6 bg-white px-6 py-4 rounded-md shadow-md'>
            <p className='text-[#3A405B] font-medium text-sm'>ADMIT DOKTER LIST</p>
            <table className='w-full mt-1 bg-white' border={1}>
              <thead>
                <tr className='text-sm border-b'>
                  <th scope='col' className='text-left p-4'>No</th>
                  <th scope='col' className='text-left'>Nama</th>
                  <th scope='col' className='text-left'>Email</th>
                  <th scope='col' className='text-left'>No HP</th>
                  <th scope='col' className='text-left'>Lokasi Konseling</th>
                  <th scope='col' className='text-left'>No SIP</th>
                  <th scope='col' className='text-left'>Detail</th>
                  <th scope='col' className='text-left'>Action</th>
                </tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr className='text-sm border-b' key={index}>
                    <th scope='row' className='text-left p-4'>{index + 1}</th>
                    <td className='text-left'>Dr Humam</td>
                    <td className='text-left'>humam@gmail.com</td>
                    <td className='text-left'>08123456789</td>
                    <td className='text-left'>Bandung</td>
                    <td className='text-left'>123456789</td>
                    <td className='text-left'>
                      <button className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-1 px-2 rounded-md'><i className="fa-solid fa-user"></i></button>
                    </td>
                    <td className='text-left flex justify-left items-left gap-2 py-3'>
                      <button className='bg-gradient-to-tr from-[#2ED8B6] to-[#59E0C5] text-white text-xs py-1 px-2 rounded-md' onClick={() => showAlert('accept')}><i className="fa-solid fa-check"></i></button>
                      <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white py-1 px-2 rounded-md text-xs' onClick={() => showAlert('reject')}><i className="fa-solid fa-xmark"></i></button>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Index;
