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
    nextStatus: "IN_PROGRESS",
    rejectStatus: "REJECTED_KITCHEN",
  },
};
