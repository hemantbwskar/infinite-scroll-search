import React from "react";

const InputBox=({searchfield,searchItems})=>{
    return(
        <div>
		<input 
		type='search' 
		placeholder ="Search for Images" 
		onChange = {searchItems}
		/>
		</div>
    );
}

export default InputBox