import React from "react";
/** @jsx jsx */
import { jsx, Grid, Input } from "theme-ui";
import Container from "../core/container";
import PeopleGrid from "./people-grid";
import Modal from "./modal.js";

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
      modalData: {},
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
    this.setState({
      board: this.props.board,
      faculty: this.props.faculty,
      contributors: this.props.contributors,
      boardEmeritus: this.props.boardEmeritus,
      alumni: this.props.alumni,
    });
  }

  handleChange = (event) => {
    this.setState({
      filter: event.target.value,
    });
    this.filter(event.target.value);
  };

  // referenced https://medium.com/@AndrewBonner2/filter-results-with-react-f746dc7984c
  filterGroup = (query, group) => {
    let filteredGroup = group.filter((person) => {
      let name = person.name.toLowerCase();
      return name.indexOf(query.toLowerCase()) !== -1;
    });
    return filteredGroup;
  };

  filter = (query) => {
    this.setState({
      board: this.filterGroup(query, this.props.board),
      faculty: this.filterGroup(query, this.props.faculty),
      contributors: this.filterGroup(query, this.props.contributors),
      boardEmeritus: this.filterGroup(query, this.props.boardEmeritus),
      alumni: this.filterGroup(query, this.props.alumni),
    });
  };

  showModal = (profileData) => {
    this.setState({ show: true, modalData: profileData });
  };

  closeModal = () => {
    this.setState({ show: false });
    this.setState({ modalData: {} });
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (e.target.className === "modal" && this.state.show) {
      this.closeModal();
    }
  };

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
        ></Modal>
        {this.state.board && this.state.board.length > 0 && (
          <PeopleGrid
            items={this.state.board}
            showModal={this.showModal}
            title="Board"
          />
        )}
        {this.state.faculty && this.state.faculty.length > 0 && (
          <PeopleGrid
            items={this.state.faculty}
            showModal={this.showModal}
            title="Faculty Mentors"
          />
        )}
        {this.state.contributors && this.state.contributors.length > 0 && (
          <PeopleGrid
            items={this.state.contributors}
            showModal={this.showModal}
            title="Contributors"
          />
        )}
        {this.state.boardEmeritus && this.state.boardEmeritus.length > 0 && (
          <PeopleGrid
            items={this.state.boardEmeritus}
            showModal={this.showModal}
            title="Board Emeritus"
          />
        )}
        {this.state.alumni && this.state.alumni.length > 0 && (
          <PeopleGrid
            items={this.state.alumni}
            showModal={this.showModal}
            title="Alumni"
          />
        )}
      </Container>
    );
  }
}

export default PeopleList;
