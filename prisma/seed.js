import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../src/utils/helpers.js";

const prisma = new PrismaClient();

// Seed data
const employees = [
  {
    nip: "881033129I",
    nama: "ABDUL KADIR",
    jabatan: "ASsistant Manager Fasilitas dan Sarana",
    bagian: "SDM dan Humas",
    subBidang: "Fasilitas dan Sarana",
    email: "abdul.kadir@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
    isAsman: true,
  },
  {
    nip: "941733238I",
    nama: "RIFDA IBNU MAJID",
    jabatan: "Officer Fasilitas dan Sarana",
    bagian: "SDM dan Humas",
    subBidang: "Fasilitas dan Sarana",
    email: "rifda@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
    isAsman: false,
  },
  {
    nip: "961733371I",
    nama: "MUHAMMAD NAUFAL AMRIZAL",
    jabatan: "Officer Fasilitas dan Sarana",
    bagian: "SDM dan Humas",
    subBidang: "Fasilitas dan Sarana",
    email: "m.naufal@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
    isAsman: false,
  },
  {
    nip: "7292352JA",
    nama: "JOKO SUKOCO",
    jabatan: "Team Leader BOP Unit 1-7 (B) SLA PGU",
    bagian: "Operasi Unit 5-7",
    subBidang: "BOP",
    email: "m.naufal2@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
    isAsman: false,
  },
  {
    nip: "7393483K3",
    nama: "AGUS KOSWARA",
    jabatan: "Team Leader BOP Unit 1-7 (B) SLA PGU",
    bagian: "Operasi Unit 5-7",
    subBidang: "BOP",
    email: "m.naufal3@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
    isAsman: false,
  },
];

const users = [
  {
    username: "admin",
    email: "admin@msdm.app",
    password: "admin123",
    name: "Admin User",
    role: "ADMIN",
    phone: "081234567890",
  },
  {
    username: "sekre",
    email: "sekre@msdm.app",
    password: "sekre123",
    name: "Sekre Admin",
    role: "ADMIN",
    phone: "081234567891",
  },
  {
    username: "sekgm.sla",
    email: "sekgm.sla@plnindonesiapower.co.id",
    password: "sekgm.sla123",
    name: "Sekretaris GM",
    role: "SECRETARY",
    phone: "081919902019",
  },
  {
    username: "sekdgmmum.sla",
    email: "sekdgmmum.sla@plnindonesiapower.co.id",
    password: "sekdgmmum.sla123",
    name: "Sekretaris SMUM",
    role: "SECRETARY",
    phone: "081288854539",
  },
  {
    username: "sekdgmboh.sla",
    email: "sekdgmboh.sla@plnindonesiapower.co.id",
    password: "sekdgmboh.sla123",
    name: "Sekretaris SMOPH",
    role: "SECRETARY",
    phone: "087741650592",
  },
  {
    username: "sekdgmbep.sla",
    email: "sekdgmbep.sla@plnindonesiapower.co.id",
    password: "sekdgmbep.sla123",
    name: "Sekretaris SMEIP",
    role: "SECRETARY",
    phone: "0838313722322",
  },
  {
    username: "sekmpip.sla",
    email: "sekmpip.sla@plnindonesiapower.co.id",
    password: "sekmpip.sla123",
    name: "Sekretaris MPBJ1",
    role: "SECRETARY",
    phone: "087888440005",
  },
  {
    username: "sekmpla.sla",
    email: "sekmpla.sla@plnindonesiapower.co.id",
    password: "sekmpla.sla123",
    name: "Sekretaris MPEP",
    role: "SECRETARY",
    phone: "085814589379",
  },
  {
    username: "sekmopn57.sla",
    email: "sekmopn57.sla@plnindonesiapower.co.id",
    password: "sekmopn57.sla123",
    name: "Sekretaris MON1-4",
    role: "SECRETARY",
    phone: "081292667200",
  },
  {
    username: "sekmhar14.sla",
    email: "sekmhar14.sla@plnindonesiapower.co.id",
    password: "sekmhar14.sla123",
    name: "Sekretaris MHAR1-4",
    role: "SECRETARY",
    phone: "081906300080",
  },
  {
    username: "sekmhar57.sla",
    email: "sekmhar57.sla@plnindonesiapower.co.id",
    password: "sekmhar57.sla123",
    name: "Sekretaris MHAR5-7",
    role: "SECRETARY",
    phone: "081214613208",
  },
  {
    username: "sekmsmh.sla",
    email: "sekmsmh.sla@plnindonesiapower.co.id",
    password: "sekmsmh.sla123",
    name: "Sekretaris MSDM",
    role: "SECRETARY",
    phone: "087871369636",
  },
  {
    username: "sekmkml.sla",
    email: "sekmkml.sla@plnindonesiapower.co.id",
    password: "sekmkml.sla123",
    name: "Sekretaris MKMLS",
    role: "SECRETARY",
    phone: "081214618936",
  },
  {
    username: "sekmeng.sla",
    email: "sekmeng.sla@plnindonesiapower.co.id",
    password: "sekmeng.sla123",
    name: "Sekretaris MENG",
    role: "SECRETARY",
    phone: "085959608800",
  },
  {
    username: "sekmrep.sla",
    email: "sekmrep.sla@plnindonesiapower.co.id",
    password: "sekmrep.sla123",
    name: "Sekretaris MREP",
    role: "SECRETARY",
    phone: "085710733161",
  },
  {
    username: "sekmsik.sla",
    email: "sekmsik.sla@plnindonesiapower.co.id",
    password: "sekmsik.sla123",
    name: "Sekretaris MSIK",
    role: "SECRETARY",
    phone: "081296513895",
  },
  {
    username: "kantinberkah",
    email: "kantinberkah@plnindonesiapower.co.id",
    password: "kantin123",
    name: "Kantin Berkah",
    role: "KITCHEN",
    phone: "081234567894",
  },
];

const menuItems = [
  { name: "Pecel Ayam", category: "HEAVY_MEAL" },
  { name: "Pecel Lele", category: "HEAVY_MEAL" },
  { name: "Nasi Pecel", category: "HEAVY_MEAL" },
  { name: "Nasi Uduk", category: "HEAVY_MEAL" },
  { name: "Nasi Goreng", category: "HEAVY_MEAL" },
  { name: "Mie Goreng/ Rebus", category: "HEAVY_MEAL" },
  { name: "Sate", category: "HEAVY_MEAL" },
  { name: "Sop", category: "HEAVY_MEAL" },
  { name: "Soto", category: "HEAVY_MEAL" },
  { name: "Nasi Padang", category: "HEAVY_MEAL" },
  { name: "Bebek Goreng", category: "HEAVY_MEAL" },
  { name: "Fried Chicken", category: "HEAVY_MEAL" },
  { name: "Somay", category: "SNACK" },
  { name: "Bakso", category: "HEAVY_MEAL" },
  { name: "Batagor", category: "SNACK" },
  { name: "Gado-Gado/Pecel", category: "HEAVY_MEAL" },
  { name: "Martabak", category: "SNACK" },
  { name: "Snack Toko", category: "SNACK" },
];

const serviceRequests = [
  {
    judulPekerjaan: "Piket  Listrik Coal Handling ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Hidayat",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Akuntansi",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mbak Peni ",
      subBidang: "MSIK",
      nomorHp: "",
    },
    pic: {
      name: "Mbak Peni ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Labaik",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Wijaya",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Laboraturium",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fitri Salamah ",
      subBidang: "MOPN 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Fitri Salamah ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Siaga Nataru",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan GV unit 5",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ardhika",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Ardhika",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Labaik",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Bebek Pak Endut",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Req Pecel Lele + Gado gado + Es Kelapa + Roti Bakar + Pecel Ayam ",
            quantity: 12,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Cleaning Vacum di Desal",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Kusuma",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Cleaning Vacum di Desal",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Suryadi",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Inspeksi Kontrol Coal Feeder 7A",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bambang Sulaksono",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Bambang Sulaksono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Andri",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Andri",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Martabak Manis 1 Martabak Telor ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Cahyo",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Cahyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2024-12-31T16:52:48.000Z",
    requiredDate: "2024-12-31T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Cleaning vacum di desal ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Bengkel 57",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI si area SU",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Suryadi",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 12,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Wijaya",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI si area SU",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Kurniawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Steering Brake Track Dozer d8l 02",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Benanda Diyo",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Benanda Diyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "SMEIP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Setiawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Up Desal 57",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MOPN 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang = Es Kelapa + Roti Bakar ",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Saputra",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Up Desal ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Wijaya",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang SDM",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Anin",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "Anin",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pemenuhan Laporan Kinerja ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Aldy ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Aldy ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start UP Desal 57 ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Andi",
      subBidang: "MOPN 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Andi",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "lembur Administrasi",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang + Es Kelapa ",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Susanto",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Eka",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Eka",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-01T16:52:48.000Z",
    requiredDate: "2025-01-01T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Cleaning vacum di desal ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Bengkel 57",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Gangguan Bidang Pemeliharaan ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Gari",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Gari",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Pecel",
            quantity: 36,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Kick Off Meeting Rotary anti Blocking ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Perbaikan D8L Final Drive & Steering Brake ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Benanda Diyo",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Benanda Diyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Bandeng Ayam ",
            quantity: 13,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Kusuma",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengambilan Material ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Khabib",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Khabib",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Rendang 3 + Ayam 2",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Rizal ",
      subBidang: "SMEIP",
      nomorHp: "",
    },
    pic: {
      name: "Rizal ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Utama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan mill 7E plugging dan belt jogging",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Doni / Diki",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Doni / Diki",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack + Minuman + Nasi",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Gangguan Bidang Pemeliharaan ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sate + Sop + Es Kelapa + Roti Bakar ",
            quantity: 14,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Susanto",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Perbaikan dinding JHF",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Tyas",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Tyas",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Yudi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Yudi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Suryadi",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan penanganan gangguan kabel slewing STRE01",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Minuman Kaleng",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-02T16:52:48.000Z",
    requiredDate: "2025-01-02T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Nas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Nas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng mix Mie Goreng",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengambilan Data DGA Unit 5-7",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Niko",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Niko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Hermawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan GV 2 unit 7",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ardhika",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Ardhika",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Baso",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Nugroho",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Gado gado + Es Kelapa + Nasi Padang + Martabak",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Susanto",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Gado gado + Es Kelapa",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Kurniawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Fasau ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "",
      subBidang: "MSDM ",
      nomorHp: "",
    },
    pic: {
      name: "",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Pratama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Laboraturium",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fitri Salamah",
      subBidang: "MOPN 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Fitri Salamah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ahmad Baehaki ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Ahmad Baehaki ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Insert belt BC 18 & recovery BC 12",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ryan Ep",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Ryan Ep",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Bebek Goreng 15 Bungkus + Pocari 1 dus + Yeos 1 dus ",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Wijaya",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Martabak",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Kurniawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Gangguan pada Compressor ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Setiawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-03T16:52:48.000Z",
    requiredDate: "2025-01-03T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Nugroho",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Baso",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Saputra",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengambilan Data DGA Unit 5-7",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Niko",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Niko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Doni",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Doni",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Gado gado + Es Kelapa + Nasi Padang + Martabak",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Pemeliharaan 1-4 ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 11,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Susanto",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan EHC unit 5",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ardhika",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Ardhika",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Pengecheckan Coalfeeder 6D motor tidak running",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "M Noor Eka ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "M Noor Eka ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Hidayat",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Suryadi",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 11,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Pengisian Batu bara ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Martabak ",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 9,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Utama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Gangguan Pada Area SDCC",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Makan Malam Pecel Lele mix Ayam , Snack Malam Martabak Asin + Manis",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Wijaya",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "MPEP",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Labaik, ( Yeos panda 2 dus, pocari 2 dus, pocari 1 dus : untuk 3 hari kedepan )",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Setiawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Pekerjaan SC 30 Perbaikan Flight bar, SC 29 Tplate anjlok, 24 Taplate ga kuat running, BC 18 Insert belt ",
    type: "MEAL",
    requestDate: "2025-01-04T16:52:48.000Z",
    requiredDate: "2025-01-04T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Permana",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Listrik Coal Handling ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Hidayat",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Wijaya",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Gangguan Pada Area SDCC",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Kurniawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "1 Tampah sedeng kueh Basah + 1 Tampah Sedeng Kueh Rebusan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rapat P2K3",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bu Dewi ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Bu Dewi ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Lembur Bidang Anggaran ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Sulistiawati",
      subBidang: "MSIK",
      nomorHp: "",
    },
    pic: {
      name: "Sulistiawati",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Siomay 13 Porsi + Pecel Ayam 4 Porsi Driver GM,OPH,MOPN 14, MOPN 57",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Solikan ",
      subBidang: "MOPN 57",
      nomorHp: "",
    },
    pic: {
      name: "Pak Solikan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Dimsum Dapoer Bunda Salira ",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Ramadhan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Imel",
      subBidang: "MPBJ2 ",
      nomorHp: "",
    },
    pic: {
      name: "Imel",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Baso",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Baso",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Hidayat",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Labaik",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Rizal ",
      subBidang: "SMEIP",
      nomorHp: "",
    },
    pic: {
      name: "Rizal ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Purnama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PUK",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Happy Chandra ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Happy Chandra ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Yudi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Yudi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Gunawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Saputra",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Sate ",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Saputra",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Penurunan Level basin dan perapihan drainase ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Dewa",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Dewa",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Coffe break ( Kopi, The, Gorengan, Lemper ) 30 pax + Ayam Kalasan + Air Mineral 600 ml 30 pax",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengelolaan WPC, Outage Management dan Kontrak Payung ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Eka ",
      subBidang: "SMOPH",
      nomorHp: "",
    },
    pic: {
      name: "Mas Eka ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Pecel Lele",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Mulyanto ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Pak Mulyanto ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Modifikasi Support agitator ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yoga ian ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yoga ian ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Kurniawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Gangguan di area 1-4",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req jalasena",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Recorvery sc 24, Insert belt bc 18",
    type: "MEAL",
    requestDate: "2025-01-05T16:52:48.000Z",
    requiredDate: "2025-01-05T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Susanto",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Kueh basah, Gorengan atau jajanan pasar ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Pengisian Batu bara ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Purnama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Santoso",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Perbaikan Control valve D8L ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Benanda Diyo",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Benanda Diyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Pecel ayam",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PUK",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Happy Chandra ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Happy Chandra ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Pecel Lele / ayam + es kelapa + roti bakar ",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Modifikasi Support agitator ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 12,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 12,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra Cleaning JSI ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Gunawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Nugroho",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Gede",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Gede",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Hidayat",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur tim rojok di area SC ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Wibowo",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 15,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Juharminto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Juharminto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Wijaya",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Hidayat",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur tim rojok di area SC ",
    type: "MEAL",
    requestDate: "2025-01-06T16:52:48.000Z",
    requiredDate: "2025-01-06T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Suryadi",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PLA ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "1 Tampah sedeng kueh Basah + 1 Tampah Sedeng Kueh Rebusan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembahasan Evaluasi Pekerjaan PM Desember ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pengelolaan WPC, Outage Management dan Kontrak Payung ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Eka ",
      subBidang: "SMOPH",
      nomorHp: "",
    },
    pic: {
      name: "Mas Eka ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "1 Tampah sedeng kueh Basah + 1 Tampah Sedeng Kueh Rebusan ",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rapat P2K3",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bu Dewi ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Bu Dewi ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Minuman Pocari 3 Dus Air Mineral 3 Dus ",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Pembersihan ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Resky",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Resky",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Kusuma",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur tim rojok di area SC ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Nugroho",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romy Nurawan ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Romy Nurawan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sate Taichan",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Humas ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "vera",
      subBidang: "MSDM ",
      nomorHp: "",
    },
    pic: {
      name: "vera",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Permana",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Perbaikan Bearing roda DT giga 03",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Benanda Diyo",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Benanda Diyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Kesepakatan RKA Tahun 2025 dengan UBH Service di ruang REOC ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yazir ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yazir ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Molyanto ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Molyanto ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 16,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Wibowo",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 19,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PLA ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Susanto",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 13,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PUK",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Happy Chandra ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Happy Chandra ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Driver GM, SMOPH,MOPN14,MOPN 57",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mbak Rina ",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mbak Rina ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Wijaya",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Pecel Ayam ",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Dul",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Pak Dul",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Pekerjaan Penurunan level basin dan persiapan kunjungan dirop",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Dewa",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Dewa",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Soto Betawi ayam 5, soto betawi daging 12, jus mix 17",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Pekerjaan Sc Flight bar, Sc 22 Ganti Gearbox, Sc 24 Fight bar",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng ",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur bidang SDM ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Qonita ",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "Qonita ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Untuk 30 Pegawai ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Melancarkan Coal Feeder 14",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Abu Kosim ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Abu Kosim ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pembersihan Saluran dan Persiapan kunjungan dirop",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Johan",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Johan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Gede",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Gede",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Wibowo",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Martabak Manis 2, Martabak Telor 2, Minuman 6",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Rini Nugroho",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Juharmito",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Juharmito",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Martabak + Minuman ",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PLA ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "1 Tampah Sedang",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Morning Meeting Coal HANDLING 1-7",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Listrik Coal Handling ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Hidayat",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan recorvory gangguan line SC",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Fauzi",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Fauzi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PLA ",
    type: "MEAL",
    requestDate: "2025-01-07T16:52:48.000Z",
    requiredDate: "2025-01-07T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang PLA ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "1 Tampah sedeng kueh Basah + 1 Tampah Sedeng Kueh Rebusan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembahasan Evaluasi Pekerjaan PM Desember ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Kajian Air Dome",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Happy Cahndra ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Happy Cahndra ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Sarapan Management",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "3 dus minuman berasa ",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan penanganan gangguan di sc24 25",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "1 Tampah Sedang rebusan mix kueh basah ",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 9,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Ramadhan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 15,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rapat internal SIK",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Sek MSIK",
      subBidang: "MSIK",
      nomorHp: "",
    },
    pic: {
      name: "Sek MSIK",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Kerja Bakti 5s diarea Boiler 5-7",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dony Rizal",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony Rizal",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 15,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Sop Ikan, Ikan Bakar, Cumi Goreng Tepung , Kangkung, Es Kelapa Muda Untuk 15 Orang",
            quantity: 12,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rapat dengan dirop",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "GM",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Gado gado",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Susanto",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Hermawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan Pengisian Batu Bara",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Romy",
      subBidang: "SMEIP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Romy",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Bebek pak de 10, Ayam Goreng 3, Driver GM,SMOPH,MOPN14,MOPN57",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Hidayat",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Hermawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Perbaikan Poros Vibrating unit 7 ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Minuman Pocari",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator & Mitra ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng/ Mie Goreng",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Santoso",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan Plugging mill& coal",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dony Rizal",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony Rizal",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "6 bks + 1 dus pocary",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Pratama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Lembur",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Imel",
      subBidang: "MPBJ2 ",
      nomorHp: "",
    },
    pic: {
      name: "Imel",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Pecel ayam/lele + es kelapa+ 6 bx roti bakar + Snack kering + Minuman",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Mie Goreng 3, Kwetiaw 3, NASI Goreng 2",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Suryadi",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Humas ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "vera",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "vera",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Hidayat",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Hermawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Gede",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Gede",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Kurniawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Wibowo",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Yudi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Yudi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Nugroho",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur basin dan rekap data cems ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Suprudianto",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Suprudianto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Wibowo",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Kajian Air Dome",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Happy Chandra ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Happy Chandra ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan:
      "Pekerjaan SU 3 penggantian bearing roda trully, Fc Abby Penggantian besring gearbox, SC 30 recovery putus flight bar mengankat, sc 25 recovery putus bawah, bc 13 setting gearbox ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Emergency",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bambang Sulaksono",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Bambang Sulaksono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Hidayat",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Utama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 13,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Lembur Bidang Operator regu A shift malam ( Pulang Pagi ) ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Op Shif Malam 30 nasgor/ mie + minuman",
            quantity: 9,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham ",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pekerjaan Melancarkan Coal Feeder 14",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Abu Kosim ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Abu Kosim ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Gangguan TSO Mill 1B ",
    type: "MEAL",
    requestDate: "2025-01-08T16:52:48.000Z",
    requiredDate: "2025-01-08T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Mak Datuk",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan recovery gangguan line SC",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Fauzi",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Fauzi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Kurniawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan TSO Mill 1B ",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Box adam 25 box, Bebek Pak Endut 25 box",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Kajian Upgrade mill",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Happy Chandra ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Happy Chandra ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan Plugging mill& coal",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Dony Rizal",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony Rizal",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 11,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Utama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea Hopperk",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Susanto",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Freedomtest unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Andri Yuwindra",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Andri Yuwindra",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Persiapan Latihan upacara K3 ",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Dedik",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Pak Dedik",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Utama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Temuan MWD pagi tadi",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Kwetiaw",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Kurniawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Sidang SDM ",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Qonita ",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "Qonita ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sate Ayam",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Rini Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Wibowo",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Humas ",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "vera",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "vera",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Pecel Ayam/ lele+ es kelapa+ Siomay+ 6 bx Roti bakar + sanck kering + minuman",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Wijaya",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Kurniawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 23,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Susanto",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 12,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan Plugging mill& coal",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dony Rizal",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony Rizal",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "6 bks + 1 dus pocary",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pengambilan data DGA unit 6",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Niko",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Niko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Snack Indomart + martabak + nasi goreng mix mie goreng + 2 dus lesegar",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Kusuma",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 11,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Hermawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-09T16:52:48.000Z",
    requiredDate: "2025-01-09T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan blower GV unit 5",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ardhika",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Ardhika",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dony ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Pratama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan Plugging mill& coal",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dony Rizal",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony Rizal",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan gangguan pengisin batu bara",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Tolak Angin 2 box",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Perbaikan pintu ruang lingkungan dan perbaikan saluran",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas tyas",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas tyas",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Makan Siang Simpang Raya + Snack Malam Martabak ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Saputra",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Chicago",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deva Hendry",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Deva Hendry",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Mill ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman/Eka ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman/Eka ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Jahri",
      subBidang: "PBJ 1 ",
      nomorHp: "",
    },
    pic: {
      name: "Pak Jahri",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Wibowo",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby Recovery unit 5-7",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bambang Sulaksono",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Bambang Sulaksono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan blower GV unit 5 & Gangguan Unit 5-7",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ardhika",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Ardhika",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Chicago",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deva Hendry",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Deva Hendry",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Ramadhan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: " Simpang Raya + Tambah 10 bks lagi",
            quantity: 11,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengawasan Pengisian Batu Bara",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Rini Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Susanto",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 22,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Unit 5-7",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Eka / deni",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Eka / deni",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Makan Siang 1, Snack Kering + Minuman 2",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket Lembur ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Ayu",
      subBidang: "GUDANG 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Ayu",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Utama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea Hopperk,Tripper,SC",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Kusuma",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 20,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bu Rika ",
      subBidang: "PBJ 1 ",
      nomorHp: "",
    },
    pic: {
      name: "Bu Rika ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Unit 5-7",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Deni Budi",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Deni Budi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Minuman rasa 5 dus",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea Hopperk,Tripper,SC",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Santoso",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 20,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Mill ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dony",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "9 bx nasi kantin + minuman 9 botol larutan",
            quantity: 15,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Utama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Ramadhan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham ",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              " Kontrol 57 : 9, Boiler : 25 ( req Martabak + Snack Kering + Minuman ) ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Gede",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Gede",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Makan Sore 8 bks + Minuman 8 botol larutan",
            quantity: 14,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Kurniawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 20,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging coal feeder unit 14",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Suwardi",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Suwardi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Susanto",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Monitoring LFO Pump ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yoga ian ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yoga ian ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Snack + Minuman + Nasgor / Mie goreng untuk 30 pegawai",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Pratama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging coal feeder unit 14",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Abu Kosim ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Abu Kosim ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea Hopperk, Tripper, SC",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Kusuma",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 12,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Rina",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Rina",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Purnama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur RSO ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Irfan ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng mix Mie Goreng",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yoga ian ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yoga ian ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasgor + Snack + Minum Untuk 30 pegawai",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 15,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Up Unit 5",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham ",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Up Unit 5",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Umam ",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Mas Umam ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Gangguan Plugging coal feeder unit 14",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Suwardi",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Suwardi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Utama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Operator",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Rendal 57 :5, Listrik 57 :10",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Rini Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Mie Goreng",
            quantity: 15,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Turbin 57 : 10, Boiler 57 10, Kontrol 57: 10, BOP 57: 10, Rendal 5",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng 8, Mie Goreng 7",
            quantity: 35,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Pekerjaan Recovery belt 602b, recovery abby floating crane, sc 28 anjlog, recovery line sc ketika gangguan ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "9 Nasgor + Minuman 1 dus larutan, Pecel lele 1 bks MOPN57",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Wijaya",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham ",
      subBidang: "MOPN 57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan:
      "Pekerjaan Recovery belt 602b, recovery abby floating crane, sc 28 anjlog, recovery line sc ketika gangguan ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Fauzi ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Fauzi ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi / mie goreng",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Trip Unit 1 ",
    type: "MEAL",
    requestDate: "2025-01-10T16:52:48.000Z",
    requiredDate: "2025-01-10T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi / mie goreng",
            quantity: 21,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Utama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Trip Unit 1 ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Turbin 57 : 10, Boiler 57 10, Kontrol 57: 10, BOP 57: 10",
            quantity: 23,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Suryadi",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman/Eka ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman/Eka ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 30,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Monitoring LFO pump dan Pekerjaan GSC 2A",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yoga ian ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yoga ian ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Hermawan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "1 Kue Tampah sedang + 1 tampah rebusan sedang",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Freedomtest unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Agus ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Mas Agus ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket Lembur ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Ayu",
      subBidang: "GUDANG 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Ayu",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Pratama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Makan Siang Simpang Raya + Snack Malam Martabak ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Suryadi",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Suryadi",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Perbaikan Plugging mill& coal",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Dony Rizal",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Dony Rizal",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Setiawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 13,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Up unit 5 ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham",
      subBidang: "MOPN 57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Manajemen 3 bks uduk pangkalan ojeg",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Unit 1",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Abu Kosim ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Abu Kosim ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket Administrasi",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang Operator ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Untuk 30 Pegawai ",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Up unit 5 ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham",
      subBidang: "MOPN 57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Start Up unit 14",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Abu Kosim ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Pak Abu Kosim ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Start Up unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MOPN 57",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Solaria",
            quantity: 32,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 12,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby start unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP ",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Gado gado + Es Kelapa + Nasi Padang + ROTI BAKAR",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 9,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Kurniawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 11,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengoprasian pompa monitoring level setling basin",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Sukma",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Sukma",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA ",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby start unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Pembersihan Saluran",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Resky ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Resky ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Wijaya",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Kartini Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Mie Ayam Bakso Spesial",
            quantity: 32,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby start unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho ",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Snack dan Minuman WPC 4 px, Boiler 57 10 px, Bangkel 3, Turbin 10, Kontrol 57 10 px",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng ",
            quantity: 32,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby Unloding BBM dengan Trucking ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho ",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasgor + Mie Goreng",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Monitoring LFO Pump",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yoga ian ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yoga ian ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng + Mie Goreng",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Ramadhan",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Start Unit ",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "6 Nasgor + Minuman",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Purnama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-11T16:52:48.000Z",
    requiredDate: "2025-01-11T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham ",
      subBidang: "MOPN 57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Kurniawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Ignitor & Mill 6 E ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Bambang Sulaksono",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Bambang Sulaksono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang HAR 5-7",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Doni",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Doni",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Uduk",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Monitoring LFO Pump",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yoga ian ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yoga ian ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Utama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Mak Datuk",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Nugroho",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000prnyu1wuntato",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby Unloding BBM dengan Trucking ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho ",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "2 Dus Pocary",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Standby Unloding BBM dengan Trucking ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho ",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Sarapan Pagi GM",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "GM",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Bebek Mba Dwi 30 BOX",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Kick Off Meeting Retubbing Boiler Unit 6  ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Dhani",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Mas Dhani",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pembongkaran HSD",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "1 Tampah Besar rebusan + 1 Tampah Besar Kueh basah",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Ramadhan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "FGD Action Plan Hasil Survey EES CHI ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Anindita",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "Anindita",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Martabak ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Lestari Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Makan Sore ( Sri rejeki )  + Snack Malam  ( Snack Kering ) ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Hermawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Penerimaan BBM",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Somay 1+ Pempek 12 + Padang 5 bks",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Pratama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Sate Kambing + sop 3 , sate ayam + sop 2 + es kelapa muda 5",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Purnama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Kusuma",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang EFF",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Rocky",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Rocky",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengelasan valve NRV 81 Unit 5 ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Anuar",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Anuar",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Didik Listyawan",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Didik Listyawan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang HAR 5-7",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Gida ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Gida ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Sate ",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Purnama",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Nugroho",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Penurunan Level Basin ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Dewa",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Dewa",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Pemasangan Vibrating ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Rendal 57",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang HAR 5-7",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Bengkel 57",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang HAR 5-7",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Kue Mix Rbusan 1 Tampah besar ( CR 14 )",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Morning Meeting Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Agus ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Mas Agus ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Morning Meeting Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham ",
      subBidang: "MOPN14",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Setiawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Goreng",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Fitri Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Purnama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Utama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Pemasangan Vibrating ",
    type: "MEAL",
    requestDate: "2025-01-12T16:52:48.000Z",
    requiredDate: "2025-01-12T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Santoso",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pengelasan valve NRV 81 Unit 5 ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Anuar",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Anuar",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "1 Tampah Besar rebusan + 1 Tampah Besar Kueh basah",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "FGD Action Plan Hasil Survey EES CHI ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Anindita",
      subBidang: "MSDM",
      nomorHp: "",
    },
    pic: {
      name: "Anindita",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Dewi Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Martabak ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Purnama",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sarapan + Jajanan Pasar5 pcs + Rbusan 1 piring",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Sarapan Pagi GM",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "GM",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Susanto",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang HAR 5-7",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Nugroho",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan TSO Mill 1B ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Rini Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Setiawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran HSD",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho ",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Driver GM, SMOPH,MOPN14,MOPN 57, DRIVER MREP",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Nugroho",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 10,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Kusuma",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Kurniawan",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI di area SC ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Tono Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Wibowo",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran BBM",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Susanto",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Req Snack Indomart & Susu Beruang",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Permana",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "1 Tampah Sedang Rebusan & 1 Tampah sedang kueh basah + Ikan bakar, udang, cumi ",
            quantity: 26,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran BBM ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang + Es Kelapa + Roti Bakar + Siomay",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi Padang",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Wibowo",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Box 9",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran HSD",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Gangguan TSO Mill 1B ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Alif ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Alif ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Siti Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Purnama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pemenuhan Laporan Kinerja ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Aldy ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Aldy ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Gunawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000nrnyu32xm7xcu",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Gede",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Gede",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Permana",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC",
    type: "MEAL",
    requestDate: "2025-01-13T16:52:48.000Z",
    requiredDate: "2025-01-13T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Hidayat",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rapat Pimpinan",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "GM",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Martabak ",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Nia Hidayat",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Kusuma",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sarapan + Jajanan Pasar5 pcs + Rbusan 1 piring",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Sarapan Pagi GM",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "GM",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Listrik 57 = 6, Turbin 57 = 5, Rendal 57 = 4, Instrumen 57 = 5, Boiler 57 = 6, Bop 57 = 5",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 15,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 5,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000zrnyu4v9zr6av",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran HSD",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP ",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Pocary 1 dus + 1 Air Mineral",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Untuk Kerja BAKTI ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Fatur ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Fatur ",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Lembur Operator",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Cahyo",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Cahyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembahasan Pergantian Trafo ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Yuki",
      subBidang: "MENG",
      nomorHp: "",
    },
    pic: {
      name: "Mas Yuki",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Pekerjaan Penggantian Mitor BC15A",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran BBM",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Tongseng Ayam 6 + Tongseng Kambing 6 + Pecel Ayam ( utk Driver gm,smoph,mopn14,mopn57,mrep )",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 9,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Wibowo",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Susanto",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bambang Sulaksono",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Bambang Sulaksono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Siti Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Bambang Sulaksono",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Bambang Sulaksono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Zainal Pratama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Indomart",
            quantity: 7,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran BBM",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 3,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Wibowo",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Perbaikan Radiator D8L 02",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Benanda Diyo",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Benanda Diyo",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Minuman Lasegar 2 dus",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Budi Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno ",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Nia Saputra",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 17,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Udin Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Nasi Padang + Es kelapa + Mie Ayam Bakso Urat  + Roti bakar 3box",
            quantity: 15,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Ramadhan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 18,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmx000mrnyutbqp3ntm",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Saputra",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000srnyuytmr7n9z",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Santoso",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Pecel Ayam",
            quantity: 8,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn2000yrnyuw0gyui9i",
            quantity: 10,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rekap Data Cems ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Saprudianto",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Saprudianto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Cahya Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Bidang HAR 5-7",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Gida ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Gida ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Ahmad Permana",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan TSO Mill 1B ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas ALIF ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas ALIF ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Wati Hidayat",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Driver ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Gede",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Pak Gede",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Wijaya",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vmz000rrnyudrm418c2",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Gangguan Plugging Tim Cleaning unit 57",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Ilham",
      subBidang: "MOPN57",
      nomorHp: "",
    },
    pic: {
      name: "Mas Ilham",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Santoso",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Joko Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Indomart & Susu Beruang ( Listrik )",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Yanto Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Eka ",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Eka ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Hermawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Luqman",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Luqman",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Nasi/ Mie Goreng",
            quantity: 23,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Zainal Permana",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn100xrnyub7p1qfe5",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T19:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Irfan ",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Irfan ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Kusuma",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Gunawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "1 Tampah kue basah mix sedang",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Ahmad Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Morning Meeting Coal HANDLING 1-7",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T16:52:48.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC",
    type: "MEAL",
    requestDate: "2025-01-14T16:52:48.000Z",
    requiredDate: "2025-01-14T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Hadi Santoso",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran HSD ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pembongkaran BBM",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Dicky Supradi",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Dicky Supradi",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Putra Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Martabak ",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Suryadi",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000wrnyu7z7vmt8p",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Fauzi A I",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Fauzi A I",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Nugroho",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Snack Malam Martabak ",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Tono Nugroho",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Putra Gunawan",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Piket ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Achmad Kustiono",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Achmad Kustiono",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Cahya Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sarapan + Jajanan Pasar5 pcs + Rbusan 1 piring",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Kartini Wijaya",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 6,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Sarapan Pagi GM",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "GM",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Utama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Uduk + Gorengan ",
            quantity: 1,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan Lembur Bidang Pemeliharaan Unit 1-4",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Mulyanto",
      subBidang: "MHAR 1-4",
      nomorHp: "",
    },
    pic: {
      name: "Mas Mulyanto",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Wijaya",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 2,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Eko Utama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmy000ornyuaey1zgho",
            quantity: 2,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Pekerjaan MO unit 5",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Romi Afriansyah",
      subBidang: "MPLA",
      nomorHp: "",
    },
    pic: {
      name: "Romi Afriansyah",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Saputra",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Joko Saputra",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn1000vrnyu1i1u6q9f",
            quantity: 4,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Yanto Setiawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 4,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Muhammad Saputra",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 11,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Penanganan Bloking Pengisian ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Joko",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Joko",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Lestari Purnama",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Sate Kambing 50, Gulai 5 Porsi Sate Merak Merpati",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Pratama",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vmz000qrnyu326nawmk",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Indah Wijaya",
        entity: "RSU",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 6,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Wati Kusuma",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 9,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Konsumsi GM",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Sek GM",
      subBidang: "MSMH",
      nomorHp: "",
    },
    pic: {
      name: "Sek GM",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Eko Ramadhan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "Makan Siang 10 Porsi",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Hadi Susanto",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Uji Emisi Cerobong ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Dewa ",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Dewa ",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Gunawan Kurniawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn20010rnyuc91bwglm",
            quantity: 7,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Rapat P3 OH unit 6 ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Galih Restu",
      subBidang: "MHAR 5-7",
      nomorHp: "",
    },
    pic: {
      name: "Galih Restu",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Muhammad Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30012rnyu18oiy8xi",
            quantity: 8,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Survey Penentuan Lokasi pilot plant",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Johan",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Johan",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Budi Hermawan",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur Mitra JSI diarea SC ",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T12:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Ratno",
      subBidang: "MPEP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Ratno",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Fitri Santoso",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn30013rnyu3jbiv1ee",
            quantity: 11,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Lembur",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Imel",
      subBidang: "MPBJ2 ",
      nomorHp: "",
    },
    pic: {
      name: "Imel",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Indah Wibowo",
        entity: "PLNIP",
        items: [
          {
            menuItemId:
              "Padang : 12 + Pada 12 utk Driver GM,SM OPH,MOPN 57,MOPN14,MREP",
            quantity: 1,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Gunawan Santoso",
        entity: "IPS",
        items: [
          {
            menuItemId: "cm5zi3vn30011rnyuiilbpvwb",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan:
      "Rapat Manajemen Pembahasan pola Pembebanan Unit Berdasarkan lineup kapal",
    type: "MEAL",
    requestDate: "2025-01-15T16:52:48.000Z",
    requiredDate: "2025-01-15T16:00:00.000Z",
    dropPoint: "Kantin",
    status: "COMPLETED",
    supervisor: {
      name: "Pak Nugroho",
      subBidang: "MREP",
      nomorHp: "",
    },
    pic: {
      name: "Pak Nugroho",
      nomorHp: "",
    },
    employeeOrders: [
      {
        employeeName: "Rini Kurniawan",
        entity: "PLNIP",
        items: [
          {
            menuItemId: "-",
            quantity: 9,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Udin Hidayat",
        entity: "KOP",
        items: [
          {
            menuItemId: "cm5zi3vn000urnyuav71fjed",
            quantity: 5,
            notes: "",
          },
        ],
      },
      {
        employeeName: "Dewi Pratama",
        entity: "MITRA",
        items: [
          {
            menuItemId: "cm5zi3vn000trnyu45vzap1o",
            quantity: 3,
            notes: "",
          },
        ],
      },
    ],
  },
  {
    judulPekerjaan: "Survey Penentuan Lokasi pilot plant",
    type: "MEAL",
    requestDate: "2025-01-16T16:52:48.000Z",
    requiredDate: "2025-01-16T06:00:00.000Z",
    dropPoint: "Lobby ADB",
    status: "COMPLETED",
    supervisor: {
      name: "Mas Johan",
      subBidang: "MKMLS",
      nomorHp: "",
    },
    pic: {
      name: "Mas Johan",
      nomorHp: "",
    },
    employeeOrders: [],
  },
];

async function clearDatabase() {
  console.log("Clearing existing data...");

  // Delete records in correct order to respect foreign key constraints
  await prisma.orderItem.deleteMany();
  await prisma.employeeOrder.deleteMany();
  await prisma.statusHistory.deleteMany();
  await prisma.approvalLink.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.dashboardUser.deleteMany();
  await prisma.employee.deleteMany();

  console.log("Cleared existing data");
}

async function seedUsers() {
  console.log("Creating users...");
  for (const user of users) {
    await prisma.dashboardUser.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      },
    });
  }
  console.log("Created users");
}

async function seedEmployees() {
  console.log("Creating employees...");
  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    });
  }
  console.log("Created employees");
}

async function seedMenuItems() {
  console.log("Creating menu items...");
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }
  console.log("Created menu items");
}

async function seedServiceRequests() {
  console.log("Creating service requests...");

  // Get admin user for handlerId
  const adminUser = await prisma.dashboardUser.findFirst({
    where: { role: "ADMIN" },
  });

  // Get first menu item for menuItemId
  const menuItem = await prisma.menuItem.findFirst();

  for (const request of serviceRequests) {
    await prisma.serviceRequest.create({
      data: {
        ...request,
        handlerId: adminUser.id,
        employeeOrders: {
          create: request.employeeOrders.map((order) => ({
            employeeName: order.employeeName,
            entity: order.entity,
            orderItems: {
              create: order.items.map((item) => ({
                menuItemId: menuItem.id, // Use the first menu item instead of hardcoded ID
                quantity: item.quantity,
                notes: item.notes,
              })),
            },
          })),
        },
        statusHistory: {
          create: {
            status: request.status,
            changedBy: adminUser.id,
            notes: "Request created",
          },
        },
        approvalLinks: {
          create: {
            token: generateToken(),
            type: "SUPERVISOR",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            isUsed: false,
          },
        },
      },
    });
  }
  console.log("Created service requests");
}

async function main() {
  try {
    await clearDatabase();
    await seedUsers();
    await seedEmployees();
    await seedMenuItems();
    await seedServiceRequests();

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
