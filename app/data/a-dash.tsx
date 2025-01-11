export interface Ticket {
  id: number;
  title: string;
  status: string;
  created_at: string;
  description: string;
}

export const tickets = [
    {
      id: 1,
      title: "Login Issue",
      status: "inprogress",
      created_at: "2023-10-01",
      description:
        "User is unable to login with correct credentials. The issue seems to be related to the authentication service. The user has tried resetting the password multiple times, but the issue persists. The support team is currently looking into the logs to identify the root cause of the problem.",
    },
    {
      id: 2,
      title: "Payment Failure",
      status: "done",
      created_at: "2023-09-25",
      description:
        "Payment gateway is not processing transactions. The issue was resolved by updating the payment gateway API. The problem was identified as a misconfiguration in the API settings, which was corrected by the technical team. All pending transactions have been reprocessed successfully.",
    },
    {
      id: 3,
      title: "Bug in Dashboard",
      status: "inprogress",
      created_at: "2023-09-30",
      description:
        "Dashboard is not displaying the correct data for user statistics. The development team is currently investigating the issue. Initial analysis suggests that there might be a problem with the data aggregation logic. A fix is being developed and will be deployed in the next release cycle.",
    },
    {
      id: 4,
      title: "UI Responsiveness Issue",
      status: "todo",
      created_at: "2023-10-05",
      description:
        "The user interface is not responsive on mobile devices. The design team is working on creating a responsive layout. The issue is currently in the planning phase, and a solution is expected to be implemented soon.",
    },
    {
      id: 5,
      title: "API Timeout Error",
      status: "onhold",
      created_at: "2023-10-03",
      description:
        "The API is experiencing timeout errors under heavy load. The issue is being investigated, but a temporary fix has been implemented to reduce the load. Further optimization is required to resolve the issue permanently.",
    },
    {
      id: 6,
      title: "Email Notification Delay",
      status: "done",
      created_at: "2023-09-28",
      description:
        "Users are experiencing delays in receiving email notifications. The issue was traced to a misconfigured email queue. The queue has been optimized, and all pending emails have been sent successfully.",
    },
    {
      id: 7,
      title: "Broken Link on Homepage",
      status: "todo",
      created_at: "2023-10-06",
      description:
        "A broken link has been identified on the homepage. The link is pointing to a deprecated page. The content team is working on updating the link to point to the correct page.",
    },
    {
      id: 8,
      title: "Database Connection Error",
      status: "inprogress",
      created_at: "2023-10-04",
      description:
        "The application is intermittently failing to connect to the database. The development team is investigating the issue and has identified a potential problem with the connection pool. A fix is being tested.",
    },
    {
      id: 9,
      title: "Feature Request: Dark Mode",
      status: "todo",
      created_at: "2023-10-02",
      description:
        "Users have requested the addition of a dark mode feature. The design team is currently gathering requirements and planning the implementation. The feature is expected to be rolled out in the next major update.",
    },
    {
      id: 10,
      title: "Performance Degradation",
      status: "onhold",
      created_at: "2023-09-29",
      description:
        "The application is experiencing performance degradation during peak hours. The issue is being analyzed, and a temporary workaround has been implemented. A long-term solution is under development.",
    },
    {
      id: 11,
      title: "Missing Translation Strings",
      status: "todo",
      created_at: "2023-10-07",
      description:
        "Some parts of the application are missing translation strings for non-English languages. The localization team is working on adding the missing translations. The issue is expected to be resolved in the next update.",
    },
    {
      id: 12,
      title: "Incorrect Billing Amount",
      status: "inprogress",
      created_at: "2023-10-08",
      description:
        "Users are reporting incorrect billing amounts on their invoices. The finance team is investigating the issue and has identified a bug in the billing calculation logic. A fix is being developed.",
    },
    {
      id: 13,
      title: "Slow Search Results",
      status: "onhold",
      created_at: "2023-10-09",
      description:
        "The search functionality is returning results slowly, especially for large datasets. The issue is being analyzed, and a temporary workaround has been implemented. A long-term solution is under development.",
    },
    {
      id: 14,
      title: "Missing User Avatars",
      status: "done",
      created_at: "2023-10-10",
      description:
        "Some user profiles are missing avatars. The issue was traced to a bug in the image upload service. The bug has been fixed, and all missing avatars have been restored.",
    },
    {
      id: 15,
      title: "Broken Export Feature",
      status: "todo",
      created_at: "2023-10-11",
      description:
        "The export feature is not working for certain file formats. The development team is investigating the issue and has identified a problem with the file conversion library. A fix is being developed.",
    },
    {
      id: 16,
      title: "Incorrect Timezone Display",
      status: "inprogress",
      created_at: "2023-10-12",
      description:
        "The application is displaying incorrect timezone information for some users. The issue is being investigated, and a fix is being developed to ensure accurate timezone handling.",
    },
    {
      id: 17,
      title: "Missing API Documentation",
      status: "todo",
      created_at: "2023-10-13",
      description:
        "Some parts of the API are missing documentation. The technical writing team is working on adding the missing documentation. The issue is expected to be resolved in the next release.",
    },
    {
      id: 18,
      title: "Broken Image Upload",
      status: "onhold",
      created_at: "2023-10-14",
      description:
        "The image upload feature is not working for certain file types. The issue is being investigated, and a temporary workaround has been implemented. A long-term solution is under development.",
    },
    {
      id: 19,
      title: "Incorrect Error Messages",
      status: "done",
      created_at: "2023-10-15",
      description:
        "Some error messages in the application are incorrect or misleading. The issue was traced to a bug in the error handling logic. The bug has been fixed, and all error messages have been updated.",
    },
    {
      id: 20,
      title: "Feature Request: Export to PDF",
      status: "todo",
      created_at: "2023-10-16",
      description:
        "Users have requested the ability to export reports to PDF format. The development team is currently gathering requirements and planning the implementation. The feature is expected to be rolled out in the next major update.",
    },
  ];