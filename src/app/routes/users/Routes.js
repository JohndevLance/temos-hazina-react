import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AttachIcon from '@material-ui/icons/AttachFile';
import axios from '../../../util/Api';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const animatedComponents = makeAnimated();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

 function Routes(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [userOpen, setUserOpen] = React.useState(false);
  const [usersOpen, setUsersOpen] = React.useState(false);
  const [team, setTeam] = React.useState({});
  const [teamusers, setTeamUsers] = React.useState({});
  const [options, setOptions] = React.useState([])
  const [selected, setSelected] = React.useState([])

  useEffect(() => {
    routes.map((route) => {
      let option = {value : route.id, label : route.name}
      setOptions(options => [...options, option]);
    })
  }, [props.routes]);

  useEffect(() => {
    console.log(selected)
  }, [selected]);

  const handleListItemClick = () => {

    const url = 'v1/route/assign/'+props.user_id;
    console.log(url)
    axios.post(
      url,
      {selected : selected}
    ).then(({data}) => {
      console.log("assignRoute: ", data);
      if (data.success) {
       props.onClose()
       props.refresh()
      } else {
       
      }
    }).catch((error) => {
      console.log(JSON.stringify(error))
      console.log("Error****:", error.message);
    });                  
  }
  const onChange = (value, { action, removedValue }) => {
    console.log(value, action, removedValue)
    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        
        break;
    }
    let result = value ? value.map(({ value }) => value) : []
    setSelected(result);
    // value = orderOptions(value);
    // this.setState({ value: value });
  }
  const { open, routes, user_id, onClose, selectedValue, ...other} = props;
  
  
    return (
      <div>
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      >
         <div style={modalStyle} className={classes.paper}>
          
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
              onChange={onChange}
            />
            <button className="btn btn-info mt-4 float-right" type="button" onClick={() => handleListItemClick()}>
                  <AttachIcon/>
                  Assign Routes
        </button>
          </div>
          
        
      </Modal>
      </div>
    );
  }


Routes.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default Routes;
