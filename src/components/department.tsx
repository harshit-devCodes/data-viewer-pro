import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

import { DEPARTMENT_DATA } from "../constants/data";

const Department = () => {
  // state to handle collapse of department
  const [expanded, setExpanded] = useState(
    Array(DEPARTMENT_DATA.length).fill(true)
  );

  const [checked, setChecked] = useState(
    DEPARTMENT_DATA.map((item) => ({
      department: false,
      subDepartment: Array(item.sub_departments.length).fill(false),
    }))
  );

  const handleDepartmentChecked = (dept: number) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      const isDepartmentChecked = !newChecked[dept].department;
      newChecked[dept] = {
        ...newChecked[dept],
        department: isDepartmentChecked,
        subDepartment: newChecked[dept].subDepartment.map(
          () => isDepartmentChecked
        ),
      };
      return newChecked;
    });
  };

  const handleSubDepartmentChecked = (dept: number, subDept: number) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[dept].subDepartment[subDept] =
        !newChecked[dept].subDepartment[subDept];

      const allSubDepartmentChecked = newChecked[dept].subDepartment.every(
        (checked) => checked
      );
      newChecked[dept].department = allSubDepartmentChecked;
      return newChecked;
    });
  };

  // function to handle collapse of department
  const handleExpanded = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      {DEPARTMENT_DATA.map((item, index) => (
        <Box key={index}>
          {/* toggle button */}
          <Button onClick={() => handleExpanded(index)}>
            <RemoveIcon />
          </Button>
          {/* department (parent) */}
          <FormControlLabel
            label={item.department}
            control={
              <Checkbox
                checked={checked[index].department}
                onChange={() => handleDepartmentChecked(index)}
              />
            }
          />
          <Collapse in={expanded[index]}>
            {/* Sub department (child) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 12,
                width: "fit-content",
              }}
            >
              {item.sub_departments.map((subDep, idx) => (
                <FormControlLabel
                  label={subDep}
                  key={idx}
                  control={
                    <Checkbox
                      checked={checked[index].subDepartment[idx]}
                      onChange={() => handleSubDepartmentChecked(index, idx)}
                    />
                  }
                />
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </div>
  );
};

export default Department;
