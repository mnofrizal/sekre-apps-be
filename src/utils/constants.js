export const APPROVAL_FLOW = {
  SUPERVISOR: {
    nextApproval: "GA",
    nextStatus: "PENDING_GA",
    rejectStatus: "REJECTED_SUPERVISOR",
  },
  GA: {
    nextApproval: "KITCHEN",
    nextStatus: "PENDING_KITCHEN",
    rejectStatus: "REJECTED_GA",
  },
  KITCHEN: {
    nextApproval: "KITCHEN_DELIVERY",
    nextStatus: "IN_PROGRESS",
    rejectStatus: "REJECTED_KITCHEN",
  },
  KITCHEN_DELIVERY: {
    nextApproval: null,
    nextStatus: "COMPLETED",
    rejectStatus: "REJECTED_KITCHEN",
  },
};

export const FRONTEND_URL = process.env.FRONTEND_ENDPOINT_URL;
export const BASE_URL = process.env.BASE_URL || "http://localhost:5200";
export const WA_URL = process.env.WA_ENDPOINT_URL;
