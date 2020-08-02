import React from 'react';
/** @jsx jsx */
import { jsx, Grid, Input } from "theme-ui";
import Container from "../core/container";
import PeopleGrid from "./people-grid";
import Modal from "../core/modal.js"

class PeopleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            faculty: [],
            contributors: [],
            boardEmeritus: [],
            alumni: [],
            filter: "",
            show: false,
            modalData: {}
        }
    }
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
        this.setState({
            board: this.props.board,
            faculty: this.props.faculty,
            contributors: this.props.contributors,
            boardEmeritus: this.props.boardEmeritus,
            alumni: this.props.alumni
        })
    }

    handleChange = (event) => {
        this.setState({
            filter: event.target.value
        })
        this.filter(event.target.value);
    }

    // referenced https://medium.com/@AndrewBonner2/filter-results-with-react-f746dc7984c
    filterGroup = (query, group) => {
        let filteredGroup = group.filter((person) => {
            let name = person.name.toLowerCase();
            return name.indexOf(query.toLowerCase()) !== -1;
        })
        return filteredGroup;
    }

    filter = (query) => {
        this.setState({
            board: this.filterGroup(query, this.props.board),
            faculty: this.filterGroup(query, this.props.faculty),
            contributors: this.filterGroup(query, this.props.contributors),
            boardEmeritus: this.filterGroup(query, this.props.boardEmeritus),
            alumni: this.filterGroup(query, this.props.alumni)
        });
    }

    showModal = (profileData) => {
        console.log("should show");
        this.setState({show: true, modalData: profileData});
    }

    closeModal = () => {
        console.log("closed");
        this.setState({show: false});
        this.setState({modalData: {}});
    }

    goToProfile = () => {
        alert("Eventually, this'll take you to their profile!");
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (e) => {
        console.log(e);
        if (e.target.className === "modal" && this.state.show) {
            console.log(e);
            this.closeModal();
        }
    }

    render() {
        return (
            <Container>
                <Grid gap={3} columns={[1, 2, 3]}>
                    <Input 
                        type="text" 
                        id="search" 
                        placeholder="Search for someone"
                        value={this.state.filter}
                        onChange={this.handleChange}
                    ></Input>
                </Grid>
                <Modal
                    show={this.state.show} 
                    closeModal={this.closeModal} 
                    data={this.state.modalData}
                    goToProfile={this.goToProfile}>
                </Modal>
                {this.state.board && this.state.board.length > 0 && (
                <PeopleGrid items={this.state.board} showModal={this.showModal} title="Board" />
                )}
                {this.state.faculty && this.state.faculty.length > 0 && (
                <PeopleGrid items={this.state.faculty} showModal={this.showModal} title="Faculty Mentors" />
                )}
                {this.state.contributors && this.state.contributors.length > 0 && (
                <PeopleGrid items={this.state.contributors} showModal={this.showModal} title="Contributors" />
                )}
                {this.state.boardEmeritus && this.state.boardEmeritus.length > 0 && (
                <PeopleGrid items={this.state.boardEmeritus} showModal={this.showModal} title="Board Emeritus" />
                )}
                {this.state.alumni && this.state.alumni.length > 0 && (
                <PeopleGrid items={this.state.alumni} showModal={this.showModal} title="Alumni" />
                )}
            </Container>
        );
    }
}

// TODO fix the rendering of the default profile images so they're the same size as others
// use media queries in the css to make the modal wider on mobile
// if i do scrollable modal, how do i make it go over even the nav??

export default PeopleList