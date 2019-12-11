import React, { Component } from "react";
import { toast } from "react-toastify";
import http from "../services/httpService";
import Page from "../common/pagination";
import { paginate } from "../util/paginate";
import UsersTable from "../components/usersTable";
import SearchBox from "./searchBox";
import _ from "lodash";

class Users extends Component {
  state = {
    users: [],
    pageSize: 5,
    currPage: 1,
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
    showUser: false,
    showToast: false
  };

  async componentDidMount() {
    try {
      http.setApiKey();
      const { data: users } = await http.getUsers();
      this.setState({ users });
      if (users[0].name === "")
      toast.error("Please check API-key", {
        containerId: "err"
      });
    } catch (ex) {}
  }

  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u.email !== user.email);
    this.setState({ users });

    try {
      http.setApiKey();
      await http.deleteUser(user.email);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This user has already been deleted", {
          containerId: "err"
        });
        this.setState({ users: originalUsers });
      }
    }
  };

  handlePage = page => {
    this.setState({ currPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currPage: 1
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currPage,
      users: allUsers,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(u =>
        u.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currPage, pageSize);

    return { totalCount: filtered.length, users };
  };

  handleClose = () => {
    const showUser = false;
    this.setState({ showUser });
  };

  handleShowUser = () => {
    const showUser = true;
    this.setState({ showUser });
  };

  closeToast = () => {
    const showToast = false;
    this.setState({ showToast });
  };

  showToast = () => {
    const showToast = true;
    this.setState({ showToast });
  };

  render() {
    const { pageSize, currPage, sortColumn, searchQuery } = this.state;
    const { totalCount, users } = this.getPagedData();
    return (
      <div className="row">
        <div className="col">
          <p>Number of users: {totalCount}</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Page
            itemsCount={totalCount}
            pageSize={pageSize}
            currPage={currPage}
            onPage={this.handlePage}
          />
        </div>
      </div>
    );
  }
}

export default Users;
