import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter()
  const [data, setData] = useState({
    method:"login",
    username:"",
    password:"",
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
      setData({ ...data, [name]: value });
  };

  const handleClick = async (event) => {
    try {
     const login = await axios({
        method:"POST",
        url:"/api/user",
        data: data
      })

      if (login.data) {
        router.replace("/main")
        const datauser = login.data
        localStorage.setItem("user", JSON.stringify(datauser) )
      } 
      // else {
      //   console.log("Invalid Login")
      // }
      
    } catch (error) {
      console.log(error)
    }
  
  }
  
  useEffect(() => {
if(localStorage.getItem("user")){
router.replace("/main")
}
  },[])
  
  return (
    <>
      <Head>
        <title>Pelelangan Online</title>
        <meta name="description" content="Ganang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='' style={{backgroundImage:`url(${"/assets/images/bg1.png"})`, width:"full", height:"100vh", backgroundSize:"cover", filter:"brightness(95%)"}}>
        <div className="h-screen w-screen flex justify-center">
      <div className="flex items-center justify-center ">
        {/* <div className="bg-[#363538] p-5">
          <p className="text-[#1D9BF0]">Silakan masukkan nama pengguna atau alamat e-mail Anda. Anda akan menerima pesan e-mail dengan instruksi tentang cara mengatur ulang kata sandi Anda.</p>
        </div> */}
                  <div className="bg-[#fff] p-4 rounded-md w-[350px] shadow-md">
                    <div className='flex justify-center'>
                  <Image src={"/assets/images/logo.png"}  alt="logo" width={100} height={100} className="mb-5" />
                  </div>
                    <div className="w-full">
                      <label className="text-black/80 text-[16px] font-bold">Username</label>
                      <input name='username' value={data?.username} onChange={handleChange} className="mt-2 bg-[#5E5E5E] focus-visible:outline-none text-white/70 w-full border border-white/50 rounded-[5px] px-3 py-2 text-base" />
                    </div>
    
    
                    <div className="w-full my-2">
                      <label className="text-black/80 text-[16px] font-bold">Password</label>
                      <input type='password' name='password' value={data?.password} onChange={handleChange} className="mt-2 bg-[#5E5E5E] focus-visible:outline-none text-white/70 w-full border border-white/50 rounded-[5px] px-3 py-2 text-base"></input>
                    </div>
    
                    <div className=" mt-3 mb-2">
                      <span className="text-sm text-black font-semibold">
                        <Link href={"/register"}>Belum Punya Akun?</Link>
                      </span>
                    </div>
    
                    <div className="flex justify-center">
                      <button onClick={handleClick} type="submit" className="bg-[#12486B] text-base hover:opacity-90 active:scale-105 transition text-white px-10 py-1 rounded-md font-bold items-center justify-center flex">Login</button>
    
                    </div>
    
                  </div>

      </div>
    </div>
      </main>
    </>
  )
}


export default Home;