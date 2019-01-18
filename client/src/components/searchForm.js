import React from 'react';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';


function styled(Component) {
  return (style, options) => {
    function StyledComponent(props) {
      const { classes, className, ...other } = props;
      return <Component className={classNames(classes.root, className)} {...other} />;
    }
    StyledComponent.propTypes = {
      classes: PropTypes.object.isRequired,
      className: PropTypes.string,
    };
    const styles =
      typeof style === 'function' ? theme => ({ root: style(theme) }) : { root: style };
    return withStyles(styles, options)(StyledComponent);
  };
}


const MyInputBase = styled(InputBase)({
  // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: "solid",
  padding: '0 30px',
});


const SearchForm = (props)=> {
	return (
		<form onSubmit={props.getFood}>
			<MyInputBase type="text" name="foodName"/>
			<Button>Submit</Button>
		</form>
	)


}

export default SearchForm;
