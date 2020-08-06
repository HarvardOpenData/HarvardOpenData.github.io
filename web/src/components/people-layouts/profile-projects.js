import React from "react";
import { Card, Container, Grid, Button, Styled, Image } from "theme-ui";
import Section from "../core/section";
import PreviewGrid from "../article-layouts/preview-grid"
import { useState } from "react";

// Shout-out to Alex for doing this in the data catalog first so I can mooch now :) 
function ProfileProjects(props) {
    const subjects = ["Projects", "Editing", "Design", "Blog posts", "All"];
    const [activeCategory, setActiveCategory] = useState("Projects");
    const cards = 
        subjects.map((subject) => {
            const included = activeCategory === subject;
            return (
                <Card
                    variant="list"
                    sx={{
                    backgroundColor: included ? "primary" : "inherit",
                    color: included ? "background" : "inherit",
                    wordWrap: "break-word",
                    "&:hover": {
                        bg: included ? "primary" : "muted",
                    },
                    }}
                    onClick={() => {
                        setActiveCategory(subject);
                    }}
                    >
                    {subject}
                </Card>
            );
        });
    const role_dict = {
        "Projects": ["author", "developer"],
        "Editing": ["editor", "manager"],
        "Design": ["designer"]
    }
    let nodes;
    if (activeCategory === "Blog posts") {
        nodes = props.blog;
    } else if (activeCategory === "All") {
        nodes = props.projects.concat(props.blog);
    } else {
        nodes = props.projects.filter((project) => {
            var person = project._rawMembers.filter((p) => {
                return (p.person.id === props.id)
            })    
            for (let role in role_dict[activeCategory]) {
                if (person[0].roles.indexOf(role_dict[activeCategory][role]) !== -1) {
                    return true;
                }
            }
            return false;
        })
    } 
    return (
        <div>
            <br></br>
            <Section header={"Latest Work"}>
                <Grid gap={4} columns={[1, "2fr 4fr", "1fr 4fr 1fr"]}>
                    <div>
                        <br></br>
                        {cards}
                    </div>
                    <div>
                        <div>
                            <PreviewGrid nodes={nodes} horizontal columns={[1]} />
                        </div>
                    </div>
                </Grid>
            </Section>
        </div>
    );
}

export default ProfileProjects;