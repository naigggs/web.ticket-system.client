export const tickets = [
  {
    id: 1,
    title: "Login Issue",
    status: "Open",
    created_at: "2023-10-01",
    description:
      "User is unable to login with correct credentials. The issue seems to be related to the authentication service. The user has tried resetting the password multiple times, but the issue persists. The support team is currently looking into the logs to identify the root cause of the problem.",
  },
  {
    id: 2,
    title: "Payment Failure",
    status: "Closed",
    created_at: "2023-09-25",
    description:
      "Payment gateway is not processing transactions. The issue was resolved by updating the payment gateway API. The problem was identified as a misconfiguration in the API settings, which was corrected by the technical team. All pending transactions have been reprocessed successfully.",
  },
  {
    id: 3,
    title: "Bug in Dashboard",
    status: "In Progress",
    created_at: "2023-09-30",
    description:
      "Dashboard is not displaying the correct data for user statistics. The development team is currently investigating the issue. Initial analysis suggests that there might be a problem with the data aggregation logic. A fix is being developed and will be deployed in the next release cycle.",
  },
];

export const announcements = [
  {
    id: 1,
    title: "System Maintenance",
    description:
      "Scheduled maintenance will occur on 2023-10-05 from 02:00 AM to 04:00 AM. During this time, the system will be unavailable. Please save your work and log out before the maintenance window.",
    created_at: "2023-10-01",
  },
  {
    id: 2,
    title: "New Feature Release",
    description:
      "A new feature for advanced reporting will be released on 2023-10-10. This feature will allow users to generate custom reports with more flexibility and options.",
    created_at: "2023-10-03",
  },
  {
    id: 3,
    title: "Holiday Notice",
    description:
      "Our office will be closed on 2023-10-15 in observance of the national holiday. Support services will resume on 2023-10-16.",
    created_at: "2023-10-01",
  },
  {
    id: 4,
    title: "Security Update",
    description:
      "A critical security update will be applied on 2023-10-08. Please ensure that you have saved all your work and logged out before this date.",
    created_at: "2023-10-02",
  },
];

export const surveys = [
  {
    id: 1,
    title: "Customer Satisfaction Survey",
    description:
      "We value your feedback. Please take a few minutes to complete our customer satisfaction survey and help us improve our services.",
    created_at: "2023-10-01",
    questions: [
      {
        id: 1,
        question: "How satisfied are you with our service?",
        type: "rating",
        options: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        question: "What can we do to improve?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    id: 2,
    title: "Feature Request Survey",
    description:
      "We are always looking to improve our product. Please let us know which features you would like to see in future updates.",
    created_at: "2023-10-05",
    questions: [
      {
        id: 1,
        question: "Which new feature would you like to see?",
        type: "text",
        options: [],
      },
      {
        id: 2,
        question: "How important is this feature to you?",
        type: "rating",
        options: [1, 2, 3, 4, 5],
      },
    ],
  },
];
