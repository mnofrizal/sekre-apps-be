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
    nextApproval: null,
    nextStatus: "COMPLETED",
    rejectStatus: "REJECTED_KITCHEN",
  },
  // KITCHEN_DELIVERY: {
  //   nextApproval: null,
  //   nextStatus: "COMPLETED",
  //   rejectStatus: "REJECTED_KITCHEN",
  // },
};

export const FRONTEND_URL = process.env.FRONTEND_ENDPOINT_URL;
// export const BACKEND_URL = process.env.BACKEND_URL;
export const WA_URL = process.env.WA_ENDPOINT_URL;
