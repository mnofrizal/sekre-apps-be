import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Seed data
const employees = [
  {
    nip: "941733238I",
    nama: "RIFDA IBNU MAJID",
    jabatan: "Officer Fasilitas dan Sarana",
    bagian: "SDM dan Humas",
    subBidang: "Fasilitas dan Sarana",
    email: "rifda@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
  },
  {
    nip: "961733371I",
    nama: "MUHAMMAD NAUFAL AMRIZAL",
    jabatan: "Officer Fasilitas dan Sarana",
    bagian: "SDM dan Humas",
    subBidang: "Fasilitas dan Sarana",
    email: "m.naufal@plnindonesiapowwe.co.id",
    nomorHp: "087733760363",
  },
];

const users = [
  {
    username: "admin",
    email: "admin@msdm.app",
    password: "admin123",
    name: "Admin User",
    role: "ADMIN",
  },
  {
    username: "sekre",
    email: "sekre@msdm.app",
    password: "sekre123",
    name: "Sekre Admin",
    role: "ADMIN",
  },
  {
    username: "sekmsmh.sla",
    email: "sekmsmh.sla@plnindonesiapower.co.id",
    password: "sekmsmh123",
    name: "Sekretaris MSDM",
    role: "SECRETARY",
  },
  {
    username: "sek.mkmls",
    email: "sek.mkmls@msdm.app",
    password: "sekmkmls123",
    name: "Sekretaris MKMLS",
    role: "SECRETARY",
  },
  {
    username: "kantinberkah",
    email: "kantinberkah@msdm.app",
    password: "kantin123",
    name: "Kantin Berkah",
    role: "KITCHEN",
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
