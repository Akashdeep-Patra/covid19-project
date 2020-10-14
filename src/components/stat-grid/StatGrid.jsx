import React from "react";
import "./StatGrid.scss";

import { Card, CardContent, Typography } from "@material-ui/core";
import Countup from "react-countup";
const StatGrid = ({handleClick, deaths, cases, recovered }) => (
  <div className="container">
    <Card onClick={()=>handleClick("cases")} className="card card__cases">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Cases
        </Typography>
        <Typography variant="h5" gutterBottom>
          <Countup start={0} end={cases} duration={2.5} separator="," />
        </Typography>
        <Typography variant="body2" gutterBottom>
          Number of cases
        </Typography>
      </CardContent>
    </Card>
    <Card onClick={()=>handleClick("recovered")} className="card card__recovered">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Recovered
        </Typography>
        <Typography variant="h5" gutterBottom>
          <Countup start={0} end={recovered} duration={2.5} separator="," />
        </Typography>
        <Typography variant="body2" gutterBottom>
          Number of recoveries
        </Typography>
      </CardContent>
    </Card>
    <Card onClick={()=>handleClick("deaths")} className="card card__deaths">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Deaths
        </Typography>
        <Typography variant="h5" gutterBottom>
          <Countup start={0} end={deaths} duration={2.5} separator="," />
        </Typography>
        <Typography variant="body2" gutterBottom>
          Number of deaciesed
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default StatGrid;
