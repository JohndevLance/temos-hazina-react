import React from "react";
import FieldListDropdown from "./FieldListDropdown";
import { ButtonToolbar, ButtonGroup}  from "react-bootstrap";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function FormActions(props) {
  const onClick = (event) => {
    props.publishForm(({collection, adminToken}) => {
      props.history.pushState(null, `/builder/published/${adminToken}`);
    });
  };

  const classes = useStyles();

  let saveIconName;
  if (props.status == "pending") {
    saveIconName = "refresh spin";
  } else {
    saveIconName = "save";
  }
  
  return (
    <div style={{"text-align":"right"}}>

    <div >
      <Button
        right
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        <FieldListDropdown className="pull-right" {...props}>
          Add a field
        </FieldListDropdown>
      </Button>
    </div>
    <div >
      <ButtonGroup>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<CloseIcon />}
        onClick={() => window.confirm("This action will reset all unsaved changes, Are you sure?") && props.resetForm()}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save your form
      </Button>
      </ButtonGroup>
    </div>
    </div>
  );
}
