import React from "react";
import { Card, Container, Grid, Button, Styled, Image } from "theme-ui";
import Section from "../core/section";

export default class ProfileProjects extends React.Component {
  render() {
    const subjects = ["As author", "As editor", "As designer"];
    const cards = 
        subjects.map((subject) => {
            return (
                <Card
                    variant="list"
                    sx={{
                    backgroundColor: "inherit",
                    color: "inherit",
                    wordWrap: "break-word",
                    "&:hover": {
                        bg: "muted",
                    },
                    }}>
                    {subject}
                </Card>
            );
        });
    return (
        <div>
            <br></br>
            <Section header={"Latest Work"}>
                <Grid gap={4} columns={[1, "2fr 4fr", "1fr 4fr 1fr"]}>
                    <div>
                        {cards}
                    </div>
                    <div>
                        Will eventually show you their work!
                    </div>
                </Grid>
            </Section>
        </div>
    );
  }
}