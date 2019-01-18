import React from 'react';


const SearchForm = (props)=> {
	return (
		<form onSubmit={props.getFood}>
			<input style={{ margin:"20px auto", display:"block"}} type="text" name="foodName"/>
			<button>Submit</button>
		</form>
	)


}

export default SearchForm;
