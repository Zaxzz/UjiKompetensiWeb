import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Pagination as Pagination2, Avatar, Dialog, DialogContent, DialogContentText, DialogActions, Modal } from "@mui/material";
import { ArrowUpward, Delete, Person, AdminPanelSettings, ArrowDownward, Add } from "@mui/icons-material";
import Link from "next/link";

function Upgrade(params) {
const [open, setOpen] = useState(false);
const router = useRouter();

const handleClik = async () => {
    try {
       const send = await axios({
            method:"POST",
            url:"/api/user",
            data:{
                method:"up",
                username: params?.username,
                token: params?.token,
                role:"petugas"
            }
        })
if (send.data.response) {
    setOpen(false)
    router.reload();
}
    } catch (error) {
        
    }
}
    return(
        <>
        <Button className="bg-green-600" color="success" variant="contained" size="small" onClick={() => {setOpen(true)}}><ArrowUpward /></Button>
        <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Naikkan <strong>{params?.nama}</strong> menjadi Petugas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Batal</Button>
          <Button onClick={handleClik}>Ya</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}
function Downgrade(params) {
const [open, setOpen] = useState(false);
const router = useRouter();

const handleClik = async () => {
    try {
       const send = await axios({
            method:"POST",
            url:"/api/user",
            data:{
                method:"up",
                username: params?.username,
                token: params?.token,
                role:"masyarakat"
            }
        })
if (send.data.response) {
    setOpen(false)
    router.reload();
}
    } catch (error) {
        
    }
}
    return(
        <>
        <Button color="warning" className="bg-orange-600" variant="contained" size="small" onClick={() => {setOpen(true)}}><ArrowDownward /></Button>
        <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Turunkan <strong>{params?.nama}</strong> menjadi Masyarakat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Batal</Button>
          <Button onClick={handleClik}>Ya</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}
function Deleteuser(params) {
const [open, setOpen] = useState(false);
const router = useRouter();

const handleClik = async () => {
    try {
       const send = await axios({
            method:"POST",
            url:"/api/user",
            data:{
                method:"delete",
                username: params?.username,
                token: params?.token,
            }
        })
if (send.data.response) {
    setOpen(false)
    router.reload();
}
    } catch (error) {
        
    }
}
    return(
        <>
        <Button color="error" className="bg-red-600" variant="contained" size="small" onClick={() => {setOpen(true)}}><Delete /></Button>
        <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Hapus <strong>{params?.nama}</strong> dari User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Batal</Button>
          <Button onClick={handleClik}>Ya</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

function Tambah(params) {
  const [open, setOpen] = useState(false);
  const [data,setData] = useState({
    token: params?.token,
  //   method:"tambah",
    nama_barang:"",
    harga_awal:"",
    deskripsi:""
  })
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  console.log(createObjectURL)
  const router = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setImage(event.target.files[0]);
      setCreateObjectURL(URL.createObjectURL(event.target.files[0]));
    } else {
      setData({ ...data, [name]: value, token: params.token });
    }
  };
  
  const handleClik = async (event) => {    
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", image);
      formData.append("token", data?.token);  
      formData.append("nama_barang", data?.nama_barang);  
      formData.append("harga_awal", data?.harga_awal);  
      formData.append("deskripsi", data?.deskripsi);  
      console.log(formData)
      try {
        const send = await axios({
          method:"POST",
          url:"/api/file",
          data:formData,
          headers:{"Content-Type" : "multipart/form-data"}
        })
        if (send.data.response) {
          router.reload()
        }
      } catch (error) {
        console.log(error)
      }   
      
    };
  
      return(
          <>
          <Button className="bg-blue-600 mb-2 flex" color="primary" variant="contained" size="medium" onClick={() => {setOpen(true)}}><Add /></Button>
          <Modal
          open={open}
          onClose={() => {setOpen(false)}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
  <div className="bg-white w-[auto] h-[auto] rounded-lg border-black p-[16px] flex flex-col gap-6">
    <h1 className="text-lg font-bold">Tambah Barang</h1>
    <div className="flex flex-row gap-3 items-center">
    <label>Nama Barang : </label> <input type="text" name="nama_barang" value={data?.nama_barang} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder="Nama Barang" ></input> 
    </div>
    {/* <div className="flex flex-row gap-3 mb-2">
    <div className="gap-[61px] flex"><label>Image </label> <label>:</label></div> <div className="flex flex-col gap-3"> <input type="file" name="image" onChange={handleChange} ></input>{ createObjectURL === null ? <Image src="/assets/images/notfound.png" width={200} height={200} />: <Image src={createObjectURL} width={200} height={200} className="object-contain max-h-[10rem]" />}</div>
    </div> */}
    {/* <div className="flex flex-row gap-3">
    <label>Harga Barang : </label> <div className="flex flex-col gap-3"> <input type="number" name="harga_awal" value={data?.harga_awal} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder={rupiah(data?.harga_awal)} ></input> <p className="text-xs text-gray-500">{rupiah(data?.harga_awal)}</p> </div>
    </div> */}
    <div className="flex flex-row gap-3 items-center mb-2">
    <div className="gap-10 flex"><label>Deskripsi </label> <label>:</label></div> <textarea type="text" name="deskripsi" value={data?.deskripsi} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder="Deskripsi barang" ></textarea> 
    </div>
    <div className="flex items-center gap-3" style={{justifyContent:"right"}}>
    <Button variant="contained" color="error" className="bg-red-600" onClick={() => {setOpen(false)}}>Cancel</Button> 
    <Button variant="contained" className="bg-blue-600" onClick={handleClik}>Submit</Button> 
    </div>
    </div>
        </Modal>
        </>
      )
  }

const Userpage =  () => {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);

    const router = useRouter();
useEffect(() => {
    const localuser = localStorage.getItem("user");
    const user = JSON.parse(localuser)
    setUser(user)
    if (!user) {
        router.replace("/")
    }
    if (user.level !== "admin") {
        router.replace("/main")
    }
},[]);

useEffect(() => {
    (async() => {
    try {
        // const get = await axios.get("/api/pengaduan")
        if(user.level === "admin")
        {
            const get = await axios({
                method:"POST",
                url:"/api/user",
                data: {
                    token: user?.token,
                    method: "get"
                }
            })
            const getdata = get.data.hasil
            setData(getdata)
        }
        } catch (error) {
            console.log(error)
        }
    })();
},[user]);
    return(
        <>

<h1 className="text-xl font-bold pb-2">Pendataan User</h1>
<div className="flex" style={{justifyContent:"right"}}>
<Button className="bg-red-700 mb-2 flex" color="primary" variant="contained" size="medium" href="/register"><Add /></Button> 
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-md pt-2 ">
      <table class="w-full text-sm text-left text-gray-500 dark:border-gray-300 border-gray-300 border">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700 border-b dark:border-gray-300 border-gray-300" >
            <tr>
                <th scope="col" class="pl-4 py-5">
                    Index
                </th>
                <th scope="col" class="py-5">
                    Profile
                </th>
                <th scope="col" class=" pl-6 py-5">
                    Nama
                </th>
                <th scope="col" class="pl-6 py-5">
                    Username
                </th>
                <th scope="col" class="pl-6 py-5">
                    No. Telp
                </th>
                <th scope="col" class="pl-6 py-5">
                    Level
                </th>
                <th scope="col" class="pl-6 py-5">
                    Aksi
                </th>
            </tr>
        </thead>
        <tbody> 
          <>
        {data?.map((data, index)=> (
          <>
          <tr  key={data.id_pengaduan} class=" border-b  dark:border-gray-300 border-gray-300 dark:hover:bg-zinc-200">
              <td class="pl-6 py-4">
                {index + 1}
              </td>
              <td class="">
              <Avatar sx={{ bgcolor: "indigo" }} aria-label="recipe">
            {data?.username ? String(data?.username).charAt(0).toUpperCase() : "?"}
          </Avatar>
              </td>
              <td class="pl-6 py-4">
             {data?.nama }
              </td>
              {/* <td class="px-6 py-5">
              {new Date(data?.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  weekday: "long",
                  month: "long",
                  year: "numeric",
                  // hour: '2-digit',
                  // minute: "2-digit"
                })}
              </td> */}
                <td class="pl-6 py-4">
                {data?.username}
                </td>
                <td class="pl-6 py-4">
                {data?.telp}
                </td>
                <td class="pl-6 py-4">
                {data?.level === "petugas" ? <AdminPanelSettings color="primary" fontSize="large" /> : <Person color="success" fontSize="large" />}
                </td>
                <td class=" pl-6 py-4">
                    <div className="gap-2 flex">
                        {data?.level === "petugas" ?
                        <Downgrade nama={data?.nama} token={user?.token} username={data?.username} />
                   : <Upgrade nama={data?.nama} token={user?.token} username={data?.username} />  }
                    <Deleteuser nama={data?.nama} token={user?.token} username={data?.username} />
                    </div>
                </td>
              </tr>        
          </>
            ))}
            </>
        </tbody>
        
    
    </table>
    <div className="dark:border-gray-300 border-gray-300 border-b border-r border-l flex flex-row py-[25px] px-[10px] items-center text-sm" style={{justifyContent:"right"}}>
      </div>
</div>


</>
    )
}

export default Userpage;