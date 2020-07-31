import React from 'react';
/** @jsx jsx */
import { jsx, Grid, Image, Styled, Text, Input } from "theme-ui";
import Container from "../components/core/container";
import PeopleGrid from "../components/people-grid";

class PeopleList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        //this.setState({[event.target.name]: event.target.value})
    }

    render() {
        console.log(this.props.board.length);
        return (
            <Container>
                <Grid gap={3} columns={[1, 2, 3]}>
                    <Input 
                        type="text" 
                        id="search" 
                        placeholder="Search for someone"
                    ></Input>
                </Grid>
                {this.props.board && this.props.board.length > 0 && (
                <PeopleGrid items={this.props.board} title="Board" />
                )}
                {this.props.faculty && this.props.faculty.length > 0 && (
                <PeopleGrid items={this.props.faculty} title="Faculty Mentors" />
                )}
                {this.props.contributors && this.props.contributors.length > 0 && (
                <PeopleGrid items={this.props.contributors} title="Contributors" />
                )}
                {this.props.boardEmeritus && this.props.boardEmeritus.length > 0 && (
                <PeopleGrid items={this.props.boardEmeritus} title="Board Emeritus" />
                )}
                {this.props.alumni && this.props.alumni.length > 0 && (
                <PeopleGrid items={this.props.alumni} title="Alumni" />
                )}
            </Container>
        );
    }
}

export default PeopleList