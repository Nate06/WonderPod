// @flow
import React, { Component } from 'react';
import { Navbar, NavbarGroup, NavbarDivider, NavbarHeading, Alignment, Button, InputGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { closeWindow, minimizeWindow, maximizeWindow } from '../actions/app';
import styles from './Nav.css';

type Props = {
  history: Object,
  closeWindow: Function,
  minimizeWindow: Function,
  maximizeWindow: Function
};

class Nav extends Component<Props> {
  props: Props;

  state = {
    term: ''
  };

  onInputChange = (event) => {
    this.setState({
      term: event.target.value
    });
  }

  onSearch = (event) => {
    event.preventDefault();
    const { term } = this.state;
    this.setState({ term: '' });
    this.props.history.push(`/search/${term}`);
  }

  onCloseWindow = () => {
    this.props.closeWindow();
  }

  onMinimizeWindow = () => {
    this.props.minimizeWindow();
  }

  onMaximizeWindow = () => {
    this.props.maximizeWindow();
  }

  render() {
    const navClass = `${styles.nav} pt-dark`;
    return (
      <Navbar className={navClass}>
        <NavbarGroup>
          <NavbarHeading>WonderPod</NavbarHeading>
          <NavbarDivider />
          <form onSubmit={this.onSearch} className={styles.nav__search_form}>
            <InputGroup
              value={this.state.term}
              onChange={this.onInputChange}
              leftIcon="search"
              rightElement={<Button type="submit" icon="arrow-right" />}
              placeholder="Search Podcast"
            />
          </form>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT} className={styles.nav__buttons}>
          <Link to="/playlist">
            <Button className="pt-minimal" icon="list" />
          </Link>
          <Link to="/">
            <Button className="pt-minimal" icon="feed-subscribed" />
          </Link>
          {/* <Link to="/config">
            <Button className="pt-minimal" icon="cog" />
          </Link> */}
          <NavbarDivider />
          <Button onClick={this.onMinimizeWindow} className="pt-minimal" icon="minus" />
          <Button onClick={this.onMaximizeWindow} className="pt-minimal" icon="plus" />
          <Button onClick={this.onCloseWindow} className="pt-minimal" icon="cross" />
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default connect(
  null,
  {
    closeWindow,
    minimizeWindow,
    maximizeWindow
  }
)(withRouter(Nav));
