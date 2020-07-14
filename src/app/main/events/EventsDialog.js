import React, { useState, useEffect } from "react";
import axios from "config/axios";
import FuseChipSelect from "@fuse/core/FuseChipSelect";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField, 
  Button, 
  Dialog,
   Typography,
    Toolbar, 
    AppBar, 
    CircularProgress,
    DialogContent,
    DialogActions
 } from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
// import IntlMessages from "../../../util/IntlMessages";
import { addEvent, editEvent, uploadImage, uploadImageUrlHandling } from "app/store/actions";

const typeList =[{
  label:"Inclusion",
  value:"inclusion"
},
{
  label:"Exclusion",
  value:"exclusion"
}]

function EventsDialog(props) {
  const dispatch = useDispatch();
  const {addEventsLoading,
    editEventsLoading
  } = useSelector(({ fuse }) => fuse.events);

  const {uploadImageLoading,
    uploadImageUrl
  } = useSelector(({ fuse }) => fuse.common);

  const [file, setFile] = useState(null);
   const [gallery, setGallery] = useState([]);
   const [imageFileURL, setImageFileURL] = useState()


  const [isEditMode, setEditMode] = useState(false);
  const defaultFormState = {
    name: "",
    description: "",
    image_url: "",
    ticket_price: "",
    type_of_seats:"",
    type:"",
    fileObj:[],
    fileArray:[],
    is_own_event:false,
    gallery:[],
  location: { lat: "", lon: "" },
  };

  const { form, handleChange, setInForm } = useForm(defaultFormState);
  useEffect(() => {
    dispatch(uploadImageUrlHandling());

    Object.keys(props.event).length ? setEditMode(true) : setEditMode(false);
    if(isEditMode){
      const { name, description,ticket_price,image_url,type_of_seats,type,is_own_event,gallery} = props.event;
      setInForm("name", name || "");
      setInForm("description", description || "")
      setInForm("ticket_price", ticket_price || "")
      setInForm("image_url", image_url || "")
      setInForm("type_of_seats", type_of_seats || "")
      setInForm("type", type || "")
      setInForm("is_own_event", is_own_event || false)
      setInForm("gallery", (gallery && gallery.length&& gallery) || [])
    }
  }, [props.event,isEditMode]); // eslint-disable-line

 useEffect(() => {
    setInForm("image_url", uploadImageUrl || props.event.image_url || "");
  }, [uploadImageUrl]); // eslint-disable-line

  function canBeSubmitted() {
      return form.name && 
      form.image_url && 
      form.description && 
      form.type&&
      form.ticket_price&&
      form.type_of_seats&&
      !!form.gallery.length;
    
  }

  function handleAddEventsuccess() {
    props.close();
  }

  function handleEmployerDetail(ev) {
    ev.preventDefault();
    const body = {
      image_url:form.image_url,
      name:form.name,
      description:form.description,
      type:form.type,
      ticket_price:form.ticket_price,
      type_of_seats:form.type_of_seats,
      gallery: form.gallery,
      location: { "lat": "", "lon": "" },
      is_own_event:form.is_own_event
      }


    isEditMode ? 
    dispatch(editEvent(body, props.event._id, handleAddEventsuccess)) : 
    dispatch(addEvent(body, handleAddEventsuccess));
  }

  function handleChangeImage(e) {
    e.preventDefault();
    setInForm("company_logo_url","");

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setImageFileURL(reader.result)
      }
      reader.readAsDataURL(file)

      dispatch(uploadImage(file));
    }
  }


  function uploadMultipleFiles(e) {
    //  console.log("files",Object.values(e.target.files))
    console.log("files",e.target.files)

    // form.fileObj.push(e.target.files)
    // setInForm("fileObj",[...form.fileObj])
    for (let i = 0; i < e.target.files.length; i++) {
      form.fileArray.push(URL.createObjectURL(e.target.files[i]))
      setInForm("fileArray",[...form.fileArray] )

      var formData = new FormData();
      formData.append("file", e.target.files[i]);
      formData.append("key", "gallery");
      formData.append("type", "image");
    
      axios
        .post(`/upload`, formData)
        .then(res => {
          form.gallery.push(res.data.data.url)
        })
        .catch(error => {
         
        });
    }
    // setFile({ file:fileArray })
}

// function uploadFiles(e) {
//     e.preventDefault()
//     console.log(file,form.fileObj)
// }
const handleChangeSelectType = (selectedOption, columnName) => {
  setInForm(columnName, selectedOption.value.split("|")[0]);
  
};

const handleChangeOwnEvent = (event) => {
  setInForm("is_own_event",event.target.checked);
};


const selectedTypeDetails = typeList && typeList.find(event => event.value === form.type);

console.log("form",form)
  return (
    <Dialog
    classes={{
      paper: "m-24"
    }}
    open={props.open}
    onClose={props.close}
    fullWidth
    maxWidth="xs"
    PaperProps={{
      style: {
        width: "calc(100% - 32px)",
        maxHeight: "calc(100% - 32px)",
        margin: "0"
      }
    }}
  >
    <AppBar position="static" elevation={1}>
      <Toolbar className="flex w-full">
        <Typography variant="subtitle1" color="inherit">
        {isEditMode ? "Edit Event" : "Add Event"}
        </Typography>
      </Toolbar>
    </AppBar>
    <form  name="employerForm" onSubmit={handleEmployerDetail} className="flex flex-col overflow-hidden">
      <DialogContent classes={{ root: "p-16" }}>

               
      <TextField
          className="mb-16"
          label="Name"
          autoFocus
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-16"
          label="Type of seats"
          id="type_of_seats"
          name="type_of_seats"
          value={form.type_of_seats}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-16"
          label="Ticket price"
          id="ticket_price"
          name="ticket_price"
          type="number"
          value={form.ticket_price}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
        />
        <div style={{ marginBottom: "25px",   position: "relative", }}>
          <img
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              backgroundColor: "#e4e4e4",
              display: "inline-block",
              verticalAlign: "bottom",
              marginRight: "0px"
            }}
            src={ imageFileURL || form.image_url}
            className="imageBox"
            alt=""
          />
          <input
            style={{
              width: "90px",
              display: "inline-block",
              position: "absolute",
              bottom: "0px",
              top: "76px",
              opacity: "0",
              height: "26px",
              cursor: "pointer",
              marginLeft: "25px"
            }}
            type="file"
            onChange={handleChangeImage}
            accept="image/*"
          />
          <abbr style={{ marginLeft: "25px", cursor: "pointer" }}>Company Image</abbr>
        </div>
        <FuseChipSelect
            className="mb-16"
            value={
              selectedTypeDetails
                ? {
                    value: selectedTypeDetails.value,
                    label: `${selectedTypeDetails.label}`
                  }
                : {}
            }
            name="employer"
            onChange={value => handleChangeSelectType(value, "type")}
            placeholder="employee_user"
            variant="fixed"
            textFieldProps={{
              label: "Select Employer",
              InputLabelProps: {
                shrink: true
              },
              variant: "outlined"
            }}
            options={typeList &&
                  typeList.map(label => ({
                    label: `${label.label}`,
                    value: `${label.value}|${label.label}`
                    // class: label.class
                  }))
                
            }
            required
          />
          <TextField
            //className="mb-16"
            label="Description"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={3}
            required
            fullWidth
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={form.is_own_event}
                onChange={handleChangeOwnEvent}
                name="is_own_event"
                color="primary"
              />
        }
        label="Own Event"
      />   
        <div>
             <abbr >Gallery Image</abbr>
            <div className="flex flex-wrap" 
            style={{
              backgroundColor: "#e4e4e4",
              height:"200px",
              overflowY:"auto",
              padding:"16px"
            }}
            >
            {((form.fileArray.length && form.fileArray) || form.gallery).map((url,i) => (
                <img key={i}
                src={url} alt="..." style={{width:"100px",height:"100px",margin:"8px",borderRadius:"10px"}}/>
            ))}
        </div>

        <div className="mt-16 flex justify-end" style={{position:"relative"}}>
            <input
              style={{width:"95px",
                     // opacity:0
                      }} 
            type="file" className="form-control" onChange={uploadMultipleFiles} multiple 
            />
            {/* <abbr style={{ position:"absolute",right:"0px", cursor: "pointer" }}>Select Multiple Image</abbr> */}
        </div>
        </div>
      </DialogContent>

      <DialogActions classes={{ root: "p-16" }}>
      <Button className="mr-8" variant="outlined" onClick={() => props.close()} disabled={addEventsLoading || editEventsLoading}>
          cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginLeft: "10px",
            minWidth: "80px",
            minHeight: "36px",
            alignSelf: "flex-end"
          }}
          disabled={!canBeSubmitted() || addEventsLoading || editEventsLoading}
        >
          {addEventsLoading && !isEditMode && <CircularProgress size={18} />}
          {editEventsLoading && isEditMode && <CircularProgress size={18} />}

          {!addEventsLoading && !isEditMode && "add"}
          {!editEventsLoading && isEditMode && "save"}
        </Button>
      </DialogActions>
    </form>
  </Dialog>

  );
}

export default EventsDialog;




 {/* <div className="form-group multi-preview">
                    {(fileArray || []).map(url => (
                        <img src={url} alt="..." />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button> */}