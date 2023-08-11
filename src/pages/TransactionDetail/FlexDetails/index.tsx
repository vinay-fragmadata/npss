import React from "react";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TRANSACTION_FLEX_DATA } from "../../../configs";
import FlexTables from "../FlexTables";

interface TabStateInterface {
  header: any[] | null;
  rows: any[] | null;
}

const FlexTabs = () => {
  const [value, setValue] = React.useState("1");
  const [currentTab, setCurrentTab] = React.useState<TabStateInterface | null>({
    header: [],
    rows: [],
  });

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    newValue: string
  ) => {
    setValue(newValue);
    const selectedTab = Object.values(TRANSACTION_FLEX_DATA).filter(
      ({ value: matchingValue }, index) => matchingValue === newValue
    );

    const [data] = selectedTab;

    const [header]: any = [Object.values(data.data)];

    setCurrentTab({ header, row: [] });
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {Object.values(TRANSACTION_FLEX_DATA).map(
              ({ value, label }, index) => {
                return (
                  <Tab label={label} value={value} key={`${value}-${index}`} />
                );
              }
            )}
          </TabList>
        </Box>

        <TabPanel value={value}>
          <FlexTables columns={currentTab?.header} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default FlexTabs;
