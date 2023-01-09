const fs = require('fs')
const fileBuffer = fs.readFileSync('data/daftarnama.json', 'utf-8')
const names = JSON.parse(fileBuffer)
const date = new Date()
const tanggal = date.getDate().toString()
const bulan = (date.getMonth()+1).toString()
console.log(names);

const commands = [

  // command pembayaran
  {
    name: 'bayar',
    description: 'Pembayaran uang les disini',
    options: [
      {
        name: "nama",
        description: "Masukkan nama kamu!",
        type: 3,
        required: true,
        // pilih nama sesuai yang terdaftar
        // choices: [
        //   {
        //    name: 'test',
        //    value: 'test'
        //   }
        // ]
        choices: names
      },
      {
        name: 'tanggal',
        description: 'Masukkan tanggal pembayaran',
        type: 3,
        required: true,
        choices: [
          {
            name: tanggal,
            value: tanggal
          }
        ]
      },
      {
        name: 'bulan',
        description: 'Masukkan bulan pembayaran',
        type: 3,
        required: true,
        choices: [
          {
            name: bulan,
            value: bulan
          }
        ]
      }
    ]
  },

  // command pendaftaran
  {
    name: 'daftarnama',
    description: 'Daftarkan nama anggota baru disini!',
    options: [
      {
        name: 'name',
        description: 'Masukkan nama anggota',
        type: 3,
        required: true
      }
    ]
  }
]

module.exports = commands