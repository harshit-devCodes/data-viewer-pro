interface DepartmentType {
  department: string;
  sub_departments: string[];
}

export const DEPARTMENT_DATA: DepartmentType[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];
