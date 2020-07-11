import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

const rows = [
  {
    id: "image",
    align: "left",
    disablePadding: false,
    label: "Image",
    sort: false
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true
  },
  {
    id: "ticket_price",
    align: "left",
    disablePadding: false,
    label: "Ticket price",
    sort: true
  },
  {
    id: "description",
    align: "left",
    disablePadding: false,
    label: "Description",
    sort: true
  },
  {
    id: "type",
    align: "left",
    disablePadding: false,
    label: "type",
    sort: true
  },
  {
    id: "delete",
    align: "left",
    disablePadding: false,
    label: "",
    sort: false
  }
];

function EventsTableHead(props) {
  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort ? (
                <Tooltip title="Sort" placement={row.align === "right" ? "bottom-end" : "bottom-start"} enterDelay={300}>
                  <TableSortLabel active={props.order.id === row.id} direction={props.order.direction} onClick={createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                row.label
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default EventsTableHead;
