import { sqlconnect } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(401).json({ response: "Unauthorized" });
  }
  if (req.method === "POST") {
    if (req.body.method) {
    //   if (req.body.method === "patch") {
    //     if (req.body.token) {
    //       const select = await sqlconnect({
    //         query: "SELECT `level` FROM user WHERE `token` = ?",
    //         values: [req.body.token],
    //       });
    //       if (select[0]?.level === "admin" || select[0]?.level === "petugas") {
    //         if (
    //           req.body.id &&
    //           (req.body.nama_barang ||
    //             req.body.harga_awal ||
    //             req.body.deskripsi)
    //         ) {
    //           // Assuming you want to update one or more fields of a "barang"
    //           const updateFields = {};
    //           if (req.body.nama_barang) {
    //             updateFields.nama_barang = req.body.nama_barang;
    //           }
    //           if (req.body.harga_awal) {
    //             updateFields.harga_awal = req.body.harga_awal;
    //           }
    //           if (req.body.deskripsi) {
    //             updateFields.deskripsi = req.body.deskripsi;
    //           }

    //           const updateQuery = "UPDATE `barang` SET ? WHERE `id_barang` = ?";
    //           const updateValues = [updateFields, req.body.id];

    //           const updateResult = await sqlconnect({
    //             query: updateQuery,
    //             values: updateValues,
    //           });

    //           if (updateResult.affectedRows > 0) {
    //             res
    //               .status(200)
    //               .json({ response: "Barang updated successfully" });
    //           } else {
    //             res.status(404).json({ response: "Barang not found" });
    //           }
    //         } else {
    //           res.status(400).json({ response: "Invalid request parameters" });
    //         }
    //       } else {
    //         res.status(401).json({ response: "Unauthorized" });
    //       }
    //     } else {
    //       res.status(401).json({ response: "Unauthorized" });
    //     }
    //   }

      if (req.body.method === "get") {
        if (req.body.token) {
          const select = await sqlconnect({
            query: "SELECT `level` FROM user WHERE `token` = ?  ",
            values: [req.body.token],
          });
          if (select[0]?.level === "admin" || select[0]?.level === "petugas") {
            const hasil = await sqlconnect({
              query: "SELECT * FROM barang",
              values: [],
            });
            res.status(200).json({ hasil });
          } else {
            res.status(401).json({ response: "Unauthorized" });
          }
        } else {
          res.status(401).json({ response: "Unauthorized" });
        }
      }
      // if (req.body.method === "tambah") {
      //         if(req.body.token){
      //     const select = await sqlconnect({
      //         query: "SELECT `level` FROM user WHERE `token` = ?  ",
      //         values: [req.body.token],
      //     });
      //     if (select[0]?.level === "admin" || select[0]?.level === "petugas") {
      //         const hasil = await sqlconnect({
      //             query: "INSERT INTO `barang` SET `nama_barang` = ? , `harga_awal` = ? , `deskripsi` = ? ",
      //             values: [req.body.nama_barang, req.body.harga_awal, req.body.deskripsi],
      //         });
      //         res.status(200).json({response:"Berhasil menambahkan barang"})
      //     }else{
      //         res.status(401).json({response:"Unauthorized"})
      //     }
      //         }else{
      //             res.status(401).json({response:"Unauthorized"})
      //         }
      // }
      if (req.body.method === "delete") {
        if (req.body.token) {
          const select = await sqlconnect({
            query: "SELECT `level` FROM user WHERE `token` = ?  ",
            values: [req.body.token],
          });
          if (select[0]?.level === "admin" || select[0]?.level === "petugas") {
            const send = await sqlconnect({
              query: "DELETE FROM `barang` WHERE `id_barang`= ?",
              values: [req.body.id],
            });
            res.status(200).json({ response: "Berhasil Menghapus" });
          } else {
            res.status(401).json({ response: "Unauthorized" });
          }
        } else {
          res.status(401).json({ response: "Unauthorized" });
        }
      }
    } else {
      res.status(401).send({ response: "no such method" });
    }
  }
}