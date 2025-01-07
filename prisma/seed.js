import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

async function main() {
  try {
    await clearDatabase();
    await seedUsers();
    await seedEmployees();
    await seedMenuItems();

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
