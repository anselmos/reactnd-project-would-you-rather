import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// to reverse the sort you would need to move a_value first : a_value - b_value
function sort_questions_answeres_count([a_key, a_value], [b_key, b_value]) {
    return (
        (
            Object.keys(b_value.answers).length +
            Object.keys(b_value.questions).length
        )
        -
        (
            Object.keys(a_value.answers).length +
            Object.keys(a_value.questions).length
        )
    );
}
function Leaderboard({auth_user, users}) {
    if(auth_user === null){
        return (
            <div> Please log in!</div>
        )
    }
    const users_data = Object.entries(users).sort(
            sort_questions_answeres_count
        ).map(([key, value]) =>
         (
                 <TableRow key={key}>
                     <TableCell>{value.name}</TableCell>
                     <TableCell>
                         <img
                            src={value.avatarURL}
                            width="100"
                            height="100"
                            alt={value.name}
                        /></TableCell>
                     <TableCell>{Object.keys(value.questions).length}</TableCell>
                     <TableCell>{Object.keys(value.answers).length}</TableCell>
                 </TableRow>
         )
    );

    return (
        <div>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>User name</TableCell>
                    <TableCell>User Picture</TableCell>
                    <TableCell>Nb of questions asked</TableCell>
                    <TableCell>Nb of questions answered</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users_data}
                </TableBody>
            </Table>
        </div>
    )
}


Leaderboard.propTypes = {
  auth_user: PropTypes.object,
  users: PropTypes.object,

}
function mapStateToProps ({ users, auth_user }) {
  return {
    auth_user: auth_user,
    users: users,
  }
}
export default connect(mapStateToProps)(Leaderboard);
