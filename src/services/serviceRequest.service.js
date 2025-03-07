import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { WA_URL } from "../utils/constants.js";
import { generateToken, getMealCategory } from "../utils/helpers.js";
import ExcelJS from "exceljs";
import * as notificationService from "./notification.service.js";

// Helper function for filtering based on role
const getRoleBasedFilter = (user) => {
  if (user.role === "ADMIN") {
    return {};
  }
  return { handlerId: user.id };
};

export const getAllServiceRequests = async (user, params = {}) => {
  const {
    startDate,
    endDate,
    status,
    type,
    employeeId,
    page = 1,
    limit = 10,
    sort = "createdAt:desc", // Default sort by createdAt in descending order
  } = params;

  // Parse sort parameter (field:order)
  const [sortField, sortOrder] = sort.split(":");
  const orderBy = {
    [sortField]: sortOrder.toLowerCase() === "asc" ? "asc" : "desc",
  };

  // Base query with all includes
  const includeOptions = {
    handler: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
    employeeOrders: {
      select: {
        id: true,
        employeeName: true,
        entity: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            notes: true,
            menuItem: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
          },
        },
      },
    },
    approvalLinks: true,
  };

  // Build where clause with filters
  const whereClause = {
    AND: [
      // Role-based filtering
      user.role === "KITCHEN"
        ? {
            status: {
              in: [
                "PENDING_KITCHEN",
                "REJECTED_KITCHEN",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
              ],
            },
          }
        : user.role !== "ADMIN"
        ? { handlerId: user.id }
        : {},

      // Date range filter
      startDate && endDate
        ? {
            requestDate: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }
        : {},

      // Status filter
      status ? { status } : {},

      // Type filter
      type ? { type } : {},

      // Employee filter
      employeeId
        ? {
            employeeOrders: {
              some: {
                id: employeeId,
              },
            },
          }
        : {},
    ],
  };

  // Get total count for pagination
  const total = await prisma.serviceRequest.count({
    where: whereClause,
  });

  // Get paginated requests with filters applied
  const requests = await prisma.serviceRequest.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy,
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
  });

  return {
    requests,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  };
};

export const convertServiceRequestsToExcel = async (requests) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Service Requests");

    // Add date row
    worksheet.mergeCells("A2:B2");
    const dateCell = worksheet.getCell("A2");
    dateCell.value = "TARIKAN DATA :";
    dateCell.font = { bold: true };
    dateCell.alignment = { horizontal: "left", vertical: "middle" };

    const currentDate = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    worksheet.getCell("C2").value = `${currentDate} WIB`;
    worksheet.getCell("C2").alignment = {
      horizontal: "left",
      vertical: "middle",
    };
    worksheet.getRow(2).height = 25; // Adjust height for date row

    // Set up columns (now starting from row 3)
    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Tanggal", key: "tanggal", width: 15 },
      { header: "Order ID", key: "orderId", width: 13 },
      { header: "Perihal", key: "perihal", width: 30 },
      { header: "Bidang", key: "bidang", width: 15 },
      { header: "Sub Bidang", key: "subBidang", width: 25 },
      { header: "Order", key: "order", width: 15 },
      { header: "PLN IP Menu", key: "plnipMenu", width: 18 },
      { header: "PLN IP Jumlah", key: "plnipJumlah", width: 10 },
      { header: "IPS Menu", key: "ipsMenu", width: 18 },
      { header: "IPS Jumlah", key: "ipsJumlah", width: 10 },
      { header: "KOP Menu", key: "kopMenu", width: 18 },
      { header: "KOP Jumlah", key: "kopJumlah", width: 10 },
      { header: "RSU Menu", key: "rsuMenu", width: 18 },
      { header: "RSU Jumlah", key: "rsuJumlah", width: 10 },
      { header: "MITRA Menu", key: "mitraMenu", width: 18 },
      { header: "MITRA Jumlah", key: "mitraJumlah", width: 10 },
      { header: "PIC", key: "pic", width: 25 },
      { header: "Judul Pekerjaan", key: "judulPekerjaan", width: 30 },
    ];

    worksheet.mergeCells("A1:S1");

    // Merge header cells (now starting from row 3)
    worksheet.mergeCells("H3:I3"); // PLN IP
    worksheet.mergeCells("J3:K3"); // IPS
    worksheet.mergeCells("L3:M3"); // KOP
    worksheet.mergeCells("N3:O3"); // RSU
    worksheet.mergeCells("P3:Q3"); // MITRA
    worksheet.mergeCells("A3:A4");
    worksheet.mergeCells("B3:B4");
    worksheet.mergeCells("C3:C4");
    worksheet.mergeCells("D3:D4");
    worksheet.mergeCells("E3:E4");
    worksheet.mergeCells("F3:F4");
    worksheet.mergeCells("G3:G4");
    worksheet.mergeCells("R3:R4");
    worksheet.mergeCells("S3:S4");

    // Center align columns A, B, C and G
    ["A", "B", "C", "G"].forEach((col) => {
      worksheet.getColumn(col).alignment = { horizontal: "center" };
    });

    // Make column C bold (Order ID)
    worksheet.getColumn("C").font = { bold: true };

    // Add entity headers (now in row 3)
    worksheet.getCell("A3").value = "NO";
    worksheet.getCell("B3").value = "TANGGAL";
    worksheet.getCell("C3").value = "ORDER ID";
    worksheet.getCell("D3").value = "PERIHAL";
    worksheet.getCell("E3").value = "BIDANG";
    worksheet.getCell("F3").value = "SUB BIDANG";
    worksheet.getCell("G3").value = "ORDER";
    worksheet.getCell("H3").value = "PLN IP";
    worksheet.getCell("J3").value = "IPS";
    worksheet.getCell("L3").value = "KOP";
    worksheet.getCell("N3").value = "RSU";
    worksheet.getCell("P3").value = "MITRA";
    worksheet.getCell("R3").value = "PIC";
    worksheet.getCell("S3").value = "JUDUL PEKERJAAN";

    // Style the merged headers
    [
      "A1",
      "A3",
      "B3",
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "H3",
      "J3",
      "L3",
      "N3",
      "P3",
      "R3",
      "S3",
    ].forEach((cell) => {
      worksheet.getCell(cell).style = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "middle" },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE9E9E9" },
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      };
    });

    const titleCell = worksheet.getCell("A1");
    titleCell.value = "LAPORAN PEMESANAN MAKAN UBP SURALAYA";
    titleCell.font = { bold: true, size: 16 }; // Increased font size
    titleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    titleCell.border = null;
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "" },
    };
    worksheet.getRow(1).height = 40; // Increased height

    // Add Menu/Jumlah subheaders (now in row 4)
    const subHeaders = ["Menu", "Jumlah"];
    ["H", "J", "L", "N", "P"].forEach((col) => {
      const menuCell = worksheet.getCell(`${col}4`);
      const jumlahCell = worksheet.getCell(
        `${String.fromCharCode(col.charCodeAt(0) + 1)}4`
      );

      menuCell.value = subHeaders[0];
      menuCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE9E9E9" },
      };
      menuCell.font = { bold: true };
      menuCell.alignment = { horizontal: "center", vertical: "middle" };

      jumlahCell.value = subHeaders[1];
      jumlahCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE9E9E9" },
      };
      jumlahCell.font = { bold: true };
      jumlahCell.alignment = { horizontal: "center", vertical: "middle" };
    });

    // Add data rows (now starting after row 4)
    const rows = requests.map((request, index) => {
      const entityCounts = {
        PLNIP: { menu: new Set(), count: 0 },
        IPS: { menu: new Set(), count: 0 },
        KOP: { menu: new Set(), count: 0 },
        RSU: { menu: new Set(), count: 0 },
        MITRA: { menu: new Set(), count: 0 },
      };

      request.employeeOrders?.forEach((order) => {
        const entity = order.entity;
        if (entityCounts[entity]) {
          order.orderItems?.forEach((item) => {
            entityCounts[entity].menu.add(item.menuItem.name);
            entityCounts[entity].count += item.quantity;
          });
        }
      });

      // Format the date
      const requestDate = new Date(request.requestDate).toLocaleString(
        "id-ID",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      return {
        no: index + 1,
        tanggal: requestDate,
        orderId: `#${request.id}`,
        perihal: request.judulPekerjaan || "",
        bidang: "",
        subBidang: request.supervisor?.subBidang || "",
        order: request.category || "",
        plnipMenu: Array.from(entityCounts.PLNIP.menu).join(", "),
        plnipJumlah: entityCounts.PLNIP.count,
        ipsMenu: Array.from(entityCounts.IPS.menu).join(", "),
        ipsJumlah: entityCounts.IPS.count,
        kopMenu: Array.from(entityCounts.KOP.menu).join(", "),
        kopJumlah: entityCounts.KOP.count,
        rsuMenu: Array.from(entityCounts.RSU.menu).join(", "),
        rsuJumlah: entityCounts.RSU.count,
        mitraMenu: Array.from(entityCounts.MITRA.menu).join(", "),
        mitraJumlah: entityCounts.MITRA.count,
        pic: request.pic ? `${request.pic.name}/${request.pic.nomorHp}` : "",
        judulPekerjaan: request.judulPekerjaan,
      };
    });

    worksheet.addRows(rows);

    // Set vertical alignment to middle for all cells and columns
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { ...cell.alignment, vertical: "middle" };
      });
    });

    // Set wrap text for menu columns
    ["H", "J", "L", "N", "P"].forEach((col) => {
      worksheet.getColumn(col).alignment = { wrapText: true };
    });

    // Explicitly set borders for rows 2 onwards (skipping title row)
    for (let i = 3; i <= worksheet.rowCount; i++) {
      worksheet.getRow(i).eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }

    return await workbook.xlsx.writeBuffer();
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw new Error("Failed to generate Excel file: " + error.message);
  }
};

export const getPendingServiceRequests = async (user) => {
  // Base query with all includes
  const includeOptions = {
    handler: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
    employeeOrders: {
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    },
    statusHistory: {
      orderBy: {
        createdAt: "desc",
      },
    },
    approvalLinks: true,
  };

  // Filter for all pending requests
  let whereClause = {
    status: {
      in: ["PENDING_KITCHEN", "PENDING_SUPERVISOR", "PENDING_GA"],
    },
  };

  // Filter based on user role
  if (user.role !== "ADMIN") {
    // Regular users only see their own pending requests
    whereClause.handlerId = user.id;
  }

  // Get all pending requests with filters applied
  const pendingServiceRequests = await prisma.serviceRequest.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: {
      createdAt: "desc",
    },
  });

  return pendingServiceRequests;
};

export const getServiceRequestById = async (id) => {
  return prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      handler: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      employeeOrders: {
        include: {
          orderItems: {
            include: {
              menuItem: true,
            },
          },
        },
      },
      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
      approvalLinks: true,
    },
  });
};

export const createServiceRequest = async (requestData, userId) => {
  const { employeeOrders, ...serviceRequestData } = requestData;
  const token = generateToken();
  let request;

  try {
    // Get user role first
    const user = await prisma.dashboardUser.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    // Determine initial status based on user role
    const initialStatus =
      user.role === "ADMIN" ? "PENDING_KITCHEN" : "PENDING_SUPERVISOR";
    const approvalType = user.role === "ADMIN" ? "KITCHEN" : "SUPERVISOR";

    // Database transaction
    request = await prisma.$transaction(async (prisma) => {
      // Create the service request with all related data
      const createdRequest = await prisma.serviceRequest.create({
        data: {
          ...serviceRequestData,
          id: token,
          type: "MEAL",
          status: initialStatus,
          handlerId: userId,
          employeeOrders: {
            create: employeeOrders.map((order) => ({
              employeeName: order.employeeName,
              entity: order.entity,
              orderItems: {
                create: order.items.map((item) => ({
                  menuItemId: item.menuItemId,
                  quantity: item.quantity,
                  notes: item.notes,
                })),
              },
            })),
          },
          statusHistory: {
            create: {
              status: initialStatus,
              changedBy: userId,
              notes: "Request created",
            },
          },
          // Create the approval link within the same transaction
          approvalLinks: {
            create: {
              token: token,
              type: approvalType,
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
              isUsed: false,
            },
          },
        },
        include: {
          employeeOrders: {
            include: {
              orderItems: {
                include: {
                  menuItem: true,
                },
              },
            },
          },
          statusHistory: true,
          approvalLinks: true,
        },
      });

      return createdRequest;
    });

    // Handle notifications based on user role
    if (user.role === "ADMIN") {
      try {
        // Get kitchen group for direct notification
        const kitchenGroup = await prisma.group.findFirst({
          where: {
            type: "KITCHEN",
          },
          select: {
            groupId: true,
          },
        });

        // Send WhatsApp notification
        if (kitchenGroup) {
          console.log("Sending WhatsApp notification to kitchen");
          try {
            const notifResponse = await fetch(
              `${WA_URL}/api/messages/confirm-to-kitchen`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: request.id,
                  groupId: kitchenGroup.groupId,
                  judulPekerjaan: request.judulPekerjaan,
                  subBidang: request.supervisor?.subBidang || "Kosong",
                  requiredDate: request.requiredDate,
                  requestDate: request.requestDate,
                  category: request.category,
                  dropPoint: request.dropPoint,
                  totalEmployees: request.employeeOrders.length,
                  employeeOrders: request.employeeOrders,
                  pic: request.pic.name,
                  picPhone: request.pic.nomorHp,
                  approvalToken: token,
                }),
              }
            );

            if (!notifResponse.ok) {
              const errorMessage = await notifResponse.text();
              console.error(
                "Failed to send WhatsApp notification to kitchen:",
                notifResponse.status,
                errorMessage
              );
            }
          } catch (error) {
            console.error(
              "Error sending WhatsApp notification to kitchen:",
              error
            );
          }
        }

        // Send push notification to kitchen staff
        try {
          await notificationService.sendNotificationToRole("KITCHEN", {
            title: `Pesanan Baru #${request.id}`,
            body: `Segera klik disini untuk melakukan konfirmasi pesanan #${request.id}`,
            data: {
              type: "kitchen_new_order",
              orderId: request.id,
              judulPekerjaan: request.judulPekerjaan,
              category: request.category,
            },
          });
        } catch (error) {
          console.error("Error sending push notification to kitchen:", error);
        }
      } catch (error) {
        console.error("Error in notification process:", error);
      }
    } else {
      // For non-admin users, send normal supervisor notification
      try {
        // Get admin group for notification
        const adminGroup = await prisma.group.findFirst({
          where: {
            type: "ADMIN",
          },
          select: {
            groupId: true,
          },
        });

        if (adminGroup) {
          console.log("Sending WhatsApp notification to supervisor");
          const notifResponse = await fetch(
            `${WA_URL}/api/messages/send-meal`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: request.id,
                phone: `62${request.supervisor.nomorHp}`,
                judulPekerjaan: request.judulPekerjaan,
                subBidang: request.supervisor?.subBidang || "Kosong",
                requiredDate: request.requiredDate,
                requestDate: request.requestDate,
                category: request.category,
                dropPoint: request.dropPoint,
                totalEmployees: request.employeeOrders.length,
                employeeOrders: request.employeeOrders,
                pic: request.pic.name,
                picPhone: request.pic.nomorHp,
                approvalToken: token,
              }),
            }
          );

          if (!notifResponse.ok) {
            const errorMessage = await notifResponse.text();
            console.error(
              "Failed to send WhatsApp notification to supervisor:",
              notifResponse.status,
              errorMessage
            );
          }
        }
      } catch (error) {
        console.error(
          "Error sending WhatsApp notification to supervisor:",
          error
        );
      }
    }

    return request;
  } catch (error) {
    console.error("Error in createServiceRequest:", error);
    throw error;
  }
};

export const updateServiceRequest = async (id, requestData) => {
  const { employeeOrders, ...serviceRequestData } = requestData;

  try {
    return await prisma.$transaction(async (prisma) => {
      // Update the main request
      const request = await prisma.serviceRequest.update({
        where: { id },
        data: serviceRequestData,
        include: {
          employeeOrders: {
            include: {
              orderItems: {
                include: {
                  menuItem: true,
                },
              },
            },
          },
        },
      });

      // If employee orders are provided, update them
      if (employeeOrders) {
        // Delete existing orders and items
        await prisma.orderItem.deleteMany({
          where: {
            employeeOrder: {
              requestId: id,
            },
          },
        });
        await prisma.employeeOrder.deleteMany({
          where: {
            requestId: id,
          },
        });

        // Create new orders and items
        await Promise.all(
          employeeOrders.map((order) =>
            prisma.employeeOrder.create({
              data: {
                requestId: id,
                employeeName: order.employeeName,
                entity: order.entity,
                orderItems: {
                  create: order.items.map((item) => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    notes: item.notes,
                  })),
                },
              },
            })
          )
        );
      }

      return request;
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export const deleteServiceRequest = async (id) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete related records first
      await prisma.orderItem.deleteMany({
        where: {
          employeeOrder: {
            requestId: id,
          },
        },
      });
      await prisma.employeeOrder.deleteMany({
        where: {
          requestId: id,
        },
      });
      await prisma.statusHistory.deleteMany({
        where: {
          requestId: id,
        },
      });
      await prisma.approvalLink.deleteMany({
        where: {
          requestId: id,
        },
      });
      // Finally delete the service request
      await prisma.serviceRequest.delete({
        where: { id },
      });
    });
    return true;
  } catch (error) {
    if (error.code === "P2025") {
      return false;
    }
    throw error;
  }
};

export const updateRequestStatus = async (id, newStatus, userId, notes) => {
  return prisma.$transaction(async (prisma) => {
    // Update the request status
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: newStatus,
        statusHistory: {
          create: {
            status: newStatus,
            changedBy: userId,
            notes: notes || `Status updated to ${newStatus}`,
          },
        },
      },
      include: {
        statusHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return updatedRequest;
  });
};

/**
 * Get recent active orders (5 most recent)
 */
export const getRecentActiveOrders = async (user) => {
  const roleFilter = getRoleBasedFilter(user);
  return await prisma.serviceRequest.findMany({
    where: {
      ...roleFilter,
      status: {
        notIn: [
          "COMPLETED",
          "CANCELLED",
          "REJECTED_SUPERVISOR",
          "REJECTED_GA",
          "REJECTED_KITCHEN",
        ],
      },
    },
    include: {
      employeeOrders: {
        include: {
          orderItems: {
            include: {
              menuItem: true,
            },
          },
        },
      },
      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
      approvalLinks: true,
    },

    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
};

/**
 * Get recent activities (7 latest status changes)
 */
export const getRecentActivities = async (user) => {
  const roleFilter = getRoleBasedFilter(user);
  const requests = user.role === "ADMIN" ? {} : { request: roleFilter };

  return await prisma.statusHistory.findMany({
    where: requests,
    include: {
      request: {
        select: {
          id: true,
          type: true,
          judulPekerjaan: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
};

/**
 * Get status statistics
 */
export const getStatusStats = async (user) => {
  const roleFilter = getRoleBasedFilter(user);
  const stats = await prisma.serviceRequest.groupBy({
    by: ["status"],
    where: roleFilter,
    _count: {
      id: true,
    },
  });

  return stats.reduce((acc, curr) => {
    acc[curr.status] = curr._count.id;
    return acc;
  }, {});
};

/**
 * Get type statistics
 */
export const getTypeStats = async (user) => {
  const roleFilter = getRoleBasedFilter(user);
  const stats = await prisma.serviceRequest.groupBy({
    by: ["type"],
    where: roleFilter,
    _count: {
      id: true,
    },
  });

  return stats.reduce((acc, curr) => {
    acc[curr.type] = curr._count.id;
    return acc;
  }, {});
};

export const completeRequest = async (id, userId, notes) => {
  return prisma.$transaction(async (prisma) => {
    // Update the request status to completed
    const completedRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: "COMPLETED",
        statusHistory: {
          create: {
            status: "COMPLETED",
            changedBy: userId,
            notes: notes || "Request completed",
          },
        },
      },
      include: {
        statusHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
        employeeOrders: {
          include: {
            orderItems: {
              include: {
                menuItem: true,
              },
            },
          },
        },
      },
    });

    // Get admin user with notification enabled
    const adminUser = await prisma.dashboardUser.findFirst({
      where: {
        isAdminNotify: true,
        phone: {
          not: null,
        },
      },
      select: {
        phone: true,
      },
    });

    // Send message to WhatsApp
    const response = await fetch(`${WA_URL}/api/messages/complete-notif`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: completedRequest.id,
        phone: adminUser.phone,
        judulPekerjaan: completedRequest.judulPekerjaan,
        subBidang: completedRequest.supervisor?.subBidang || "Kosong",
        requiredDate: completedRequest.requiredDate,
        category: completedRequest.category,
        dropPoint: completedRequest.dropPoint,
        totalEmployees: completedRequest.employeeOrders.length,
        notes: completedRequest.statusHistory[0].notes,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return completedRequest;
  });
};
