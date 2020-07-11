import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseAnimate from "@fuse/core/FuseAnimate";
import _ from "@lodash";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { Typography, LinearProgress, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventsTableHead from "./EventsTableHead";
import { getEventsList, deleteEvent } from "../../store/actions";
import DeleteDialog from "../../../components/DeleteDialog";
var moment = require("moment");

function EventsTable(props) {
  const dispatch = useDispatch();
  const {fetchEventsList,
    fetchEventsListLoading,
    deleteEventsLoading
  } = useSelector(({ fuse }) => fuse.events);
 

  const [currentEvent, setCurrentEvent] = useState({});

  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null
  });

  useEffect(() => {
    !fetchEventsList.length && dispatch(getEventsList());
  }, [fetchEventsList.length]); // eslint-disable-line

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id
    });
  }

  let filteredData = fetchEventsList;

  if (props.searchText) {
    filteredData = filteredData.filter(event => {
      return (
        (event.name && event.name.toLowerCase().includes(props.searchText.trim().toLowerCase())) ||
        (event.ticket_price && event.ticket_price.toLowerCase().includes(props.searchText.trim().toLowerCase()))||
        (event.type && event.type.toLowerCase().includes(props.searchText.trim().toLowerCase())) 
      );
    });
  }

  function handleClick(item) {
    //props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    props.currentEvent(item);
  }
  function handleOpenDeleteDialog(event) {
    setCurrentEvent(event);
    setOpenDeleteDialog(true);
  }
  function handleCloseDeleteDialog() {
    setCurrentEvent({});
    setOpenDeleteDialog(false);
  }

  function handleDeleteSuccess() {
    setOpenDeleteDialog(false);
  }

  function handleSuccessDeleted() {
    dispatch(deleteEvent(currentEvent._id, handleDeleteSuccess));
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected([].map(n => n.id));
      return;
    }
    setSelected([]);
  }
  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (filteredData.length === 0) {
    return (
      <FuseAnimate delay={100}>
        <div className="flex flex-1 items-center justify-center h-full mt-100">
          <Typography color="textSecondary" variant="h5">
            {fetchEventsListLoading ? (
              <div className="flex flex-1 flex-col items-center justify-center  ">
                <Typography className="text-20 mb-16" color="textSecondary">
                  Loading...
                </Typography>
                <LinearProgress className="w-xs" color="secondary" />
              </div>
            ) : (
              "No Data"
            )}
          </Typography>
        </div>
      </FuseAnimate>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <EventsTableHead
            numSelected={selected.length}
            order={order}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
            rowCount={filteredData.length}
          />

          <TableBody>
            {_.orderBy(
              filteredData,
              [
                o => {
                  switch (order.id) {
                    case "name": {
                      return o.name;
                    }
                    case "ticket_price": {
                      return o.ticket_price;
                    }
                    case "description": {
                      return o.description;
                    }
                    case "type": {
                      return o.type;
                    }
                    
                    default: {
                      return o[order.id];
                    }
                  }
                }
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow className="h-64" hover role="checkbox" aria-checked={isSelected} tabIndex={-1} key={n._id} selected={isSelected}>
                    <TableCell
                      className="w-52"
                      component="th"
                      scope="row"
                      //padding="none"
                    >
                      {n.image_url ? (
                        <Avatar className="" alt="user photo" src={n.image_url} />
                      ) : (
                        <Avatar className="">{n.name[0]}</Avatar>
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.ticket_price}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Tooltip title={n.description}>
                        <Typography className="truncate">
                          {_.truncate(n.description && n.description.replace(/<(?:.|\n)*?>/gm, ""), { length: 20 })}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.type}
                    </TableCell>

                    <TableCell component="th" scope="row" className="flex justify-end">
                      <span className="flex">
                        <IconButton onClick={event => handleClick(n)}>
                          <Icon>edit</Icon>
                        </IconButton>
                        <DeleteDialog
                          open={isOpenDeleteDialog && currentEvent._id===n._id}
                          close={handleCloseDeleteDialog}
                          handleClick={e => handleOpenDeleteDialog(n)}
                          loading={deleteEventsLoading}
                          success={handleSuccessDeleted}
                        />
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="overflow-hidden"
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default EventsTable;
