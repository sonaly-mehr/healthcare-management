import { SidebarItem, UserRole } from "@/types";

//icons
import { USER_ROLE } from "@/constants/role";
import {
  BookDown,
  CalendarCheck,
  CalendarDays,
  CalendarFold,
  CalendarRange,
  Contact,
  CreditCard,
  FileChartColumnIncreasing,
  Gem,
  House,
  KeyRound,
  MessageSquareCode,
  Stethoscope,
  UserRoundPen,
  UsersRound,
} from "lucide-react";

export const sidebarMenuItems = (role: UserRole): SidebarItem[] => {
  const roleMenus: SidebarItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard`,
          icon: <House />,
        },
        {
          title: "Manage Users",
          path: `/dashboard/${role}/manage-users`,
          icon: <UsersRound />,
        },
        {
          title: "Password",
          path: `/dashboard/change-password`,
          icon: <KeyRound />
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard`,
          icon: <House />,
        },
        {
          title: "Specialties",
          path: `/dashboard/${role}/specialties`,
          icon: <Gem />,
        },
        {
          title: "Doctors",
          path: `/dashboard/${role}/doctor`,
          icon: <Stethoscope />,
        },
        {
          title: "Patients",
          path: `/dashboard/${role}/patient`,
          icon: <Contact />,
        },
        {
          title: "Schedules",
          path: `/dashboard/${role}/schedule`,
          icon: <CalendarCheck />,
        },
        {
          title: "Appointments",
          path: `/dashboard/${role}/appointment`,
          icon: <CalendarDays />,
        },
        {
          title: "Reviews",
          path: `/dashboard/${role}/review`,
          icon: <MessageSquareCode />,
        },
        {
          title: "Password",
          path: `/dashboard/change-password`,
          icon: <KeyRound />
        }
      );
      break;

    case USER_ROLE.DOCTOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard`,
          icon: <House />,
        },
        {
          title: "Schedules",
          path: `/dashboard/${role}/schedules`,
          icon: <CalendarRange />,
        },
        {
          title: "Appointments",
          path: `/dashboard/${role}/appointment`,
          icon: <CalendarFold />,
        },
        {
          title: "Profile",
          path: `/dashboard/${role}/profile`,
          icon: <UserRoundPen />
        },
        {
          title: "Password",
          path: `/dashboard/change-password`,
          icon: <KeyRound />
        }
      );
      break;

    case USER_ROLE.PATIENT:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard`,
          icon: <House />,
        },
        {
          title: "Appointments",
          path: `/dashboard/${role}/appointments`,
          icon: <BookDown />,
        },
        {
          title: "Prescriptions",
          path: `/dashboard/${role}/prescriptions`,
          icon: <FileChartColumnIncreasing />,
        },
        {
          title: "Payment History",
          path: `/dashboard/${role}/payment-history`,
          icon: <CreditCard />
        },
        {
          title: "Profile",
          path: `/dashboard/${role}/profile`,
          icon: <UserRoundPen />
        },
        {
          title: "Password",
          path: `/dashboard/change-password`,
          icon: <KeyRound />
        },
        {
          title: "Medical Reports",
          path: `/dashboard/${role}/medical-report`,
          icon: <FileChartColumnIncreasing />,
        },
        {
          title: "Health Data",
          path: `/dashboard/${role}/health-data`,
          icon: <FileChartColumnIncreasing />,
        },
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};
