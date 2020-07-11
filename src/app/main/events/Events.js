import React, { useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import EventsHeader from "./EventsHeader";
import EventsTable from "./EventsTable";
import EventsDialog from "./EventsDialog";

function Events() {
  const [isOpenEventDialog, setOpenEventDialog] = useState(false);
  const [event, setEvent] = useState(false);
  const [searchText, setSearchText] = useState("");

  function handleOpenEmployerDialog() {
    setOpenEventDialog(true);
    setEvent({});
  }
  function handleCloseEmployerPopup() {
    setOpenEventDialog(false);
  }
  function handleCurrentEmployer(emp, value) {
    setEvent(emp);
    setOpenEventDialog(true);
  }
  function handleSearchText(value) {
    setSearchText(value);
  }

  return (
    <React.Fragment>
      <FusePageCarded
        classes={{
          content: "flex",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
        }}
        header={<EventsHeader isOpenEventDialog={handleOpenEmployerDialog} searchText={handleSearchText} />}
        content={<EventsTable currentEvent={handleCurrentEmployer} searchText={searchText} />}
        innerScroll
      />
      {isOpenEventDialog && <EventsDialog open={isOpenEventDialog} close={handleCloseEmployerPopup} event={event} />}
    </React.Fragment>
  );
}

export default Events;
