import React from "react";
import { FirestoreCollection } from "react-firestore";

// UI imports
import { Tabs, Table, Spin } from "antd";

// Plotly imports
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

// UI setup
const TabPane = Tabs.TabPane;

const tabBarStyle = {
  "background-color": "#c90016",
  color: "white"
};

// Plotly setup
const Plot = createPlotlyComponent(Plotly);

const layout = {
  title: "Performance over time",
  yaxis: {
    title: "Wins"
  }
};

// The columns for the table in each tab
const columns = [
  {
    title: "Season",
    dataIndex: "season",
    key: "season"
  },
  {
    title: "Overall",
    dataIndex: "overall",
    key: "season"
  },
  {
    title: "Home",
    dataIndex: "home",
    key: "home"
  },
  {
    title: "Away",
    dataIndex: "away",
    key: "away"
  },
  {
    title: "Neutral",
    dataIndex: "neutral",
    key: "neutral"
  },
  {
    title: "Current Streak",
    dataIndex: "streak",
    key: "streak"
  }
];

/* If you're planning on adding more teams to the scraper, either add them
 * to this list or find a way to abstract this out by grabbing the list of teams
 * we have data on from Firestore
 */

const teams = [
  "Field Hockey",
  "Football",
  "Men's Basketball",
  "Men's Lacrosse",
  "Men's Soccer",
  "Men's Volleyball",
  "Softball",
  "Women's Basketball",
  "Women's Lacrosse",
  "Women's Soccer",
  "Women's Volleyball"
];

/* Antd's tabs feature lazy loading of content within the tabs. This way, we
 * avoid pulling data from Firebase until we need to, cutting down on our read
 * quota. Consider this if you're planning on switching UI libraries.
 */

function Navigator() {
  return (
    <React.Fragment>
      <h2 className="title">Harvard Athletics Scoreboard</h2>
      <Tabs
        className="Navigator"
        defaultActiveKey="1"
        tabBarStyle={tabBarStyle}
        tabPosition="left"
      >
        {teams.map((team, i) => (
          <TabPane tab={team} key={i + 1}>
            <FirestoreCollection
              path="sports-scores"
              filter={["team", "==", team]}
              render={({ isLoading, data }) => {
                return isLoading ? (
                  <Spin size="large" className="Scoreboard" />
                ) : (
                  Scoreboard(data)
                );
              }}
            />
          </TabPane>
        ))}
      </Tabs>
    </React.Fragment>
  );
}

function Scoreboard(data) {
  return (
    <div className="Scoreboard">
      <Table dataSource={data} columns={columns} />
      <Plot
        data={[
          {
            type: "bar",
            marker: { color: "rgb(201, 0, 22)" },
            x: data.map(el => el.season + " Season"),
            y: data.map(el => parseInt(el.overall.split("-")[0]))
          }
        ]}
        layout={layout}
      />
    </div>
  );
}
export default Navigator;
