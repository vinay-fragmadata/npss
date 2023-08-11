import React from "react";
import { Box, Card, CardContent, styled, Typography } from "@mui/material";

import { StyledFlexBox } from "../../styledComponents/StyledFlexBox";
import { StyledDashboardCardHeader } from "./styledComponent";
import LineGraph from "../Graphs/LineGraph";
import DashboardTable from "./DashboardTable";

const DashboardCard = ({
  title,
  data,
  uniqueKey = "",
  hasTable,
  hasLineChart,
  headers,
  rows,
  chartData,
}: {
  title: string;
  data: any[];
  uniqueKey: string;
  hasTable: boolean;
  hasLineChart: boolean;
  headers: any[];
  rows: any[];
  chartData: any[];
}) => {
  return (
    <Card sx={{ width: "48%" }} key={uniqueKey}>
      <StyledDashboardCardHeader
        sx={{ fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        {title}
      </StyledDashboardCardHeader>
      <CardContent>
        <StyledFlexBox>
          {data &&
            data.map(({ label, value }, index) => {
              return (
                <Box key={`${value}-${index}`}>
                  <StyledCardPrimaryText
                    sx={{ fontSize: 25 }}
                    color="text.secondary"
                    gutterBottom
                    key={index}
                  >
                    {value}
                  </StyledCardPrimaryText>
                  <StyledCardSecondaryText
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {label}
                  </StyledCardSecondaryText>
                </Box>
              );
            })}
        </StyledFlexBox>

        {hasTable && (
          <DashboardTable columns={headers} rows={rows} title={""} />
        )}
        {hasLineChart && <LineGraph data={chartData} />}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

/**
 * @description Custom Styling
 */
const StyledCardPrimaryText = styled(Typography)(({ theme }) => ({
  color: "#FF5E00",
  width: "fit-content",
  margin: "auto",
  fontFamily: "Gilroy-Semibold",
}));

const StyledCardSecondaryText = styled(Typography)(({ theme }) => ({
  color: "#1A4198",
  width: "fit-content",
  margin: "auto",
  fontFamily: "Gilroy-Semibold",
}));
