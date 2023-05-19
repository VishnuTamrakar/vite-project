import { useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Hardcoded JSON data
const departmentsData = [
  {
    id: 1,
    name: "Customer_Service",
    subDepartments: [
      { id: 11, name: "Support" },
      { id: 12, name: "Customer_Success" },
    ],
  },
  {
    id: 2,
    name: "Design",
    subDepartments: [
      { id: 21, name: "Graphic_Design" },
      { id: 22, name: "Product_Design" },
      { id: 23, name: "Web_Design" },
    ],
  },
];

const DepartmentList = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggleExpand = (id: number) => {
    setExpanded((prevExpanded) => {
      const isExpanded = prevExpanded.includes(id);
      return isExpanded
        ? prevExpanded.filter((val) => val !== id)
        : [...prevExpanded, id];
    });
  };

  const handleToggleSelect = (id: number) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected
        ? prevSelected.filter((val) => val !== id)
        : [...prevSelected, id];
    });
  };

  const isExpanded = (id: number) => expanded.includes(id);
  const isSelected = (id: number) => selected.includes(id);

  const renderSubDepartments = (
    subDepartments: { id: number; name: string }[]
  ) => {
    return subDepartments.map((subDept) => (
      <div key={subDept.id}>
        <ListItem component="div" sx={{ pl: 4 }}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected(subDept.id)}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": subDept.id.toString() }}
              onChange={() => handleToggleSelect(subDept.id)}
            />
          </ListItemIcon>
          <ListItemText primary={subDept.name} />
        </ListItem>
      </div>
    ));
  };

  const renderDepartments = () => {
    return departmentsData.map((dept) => (
      <div key={dept.id}>
        <ListItem component="div" onClick={() => handleToggleExpand(dept.id)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected(dept.id)}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": dept.id.toString() }}
              onChange={() => handleToggleSelect(dept.id)}
            />
          </ListItemIcon>
          <ListItemText primary={dept.name} />
          {isExpanded(dept.id) ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isExpanded(dept.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderSubDepartments(dept.subDepartments)}
          </List>
        </Collapse>
      </div>
    ));
  };

  return <List component="nav">{renderDepartments()}</List>;
};

export default DepartmentList;
