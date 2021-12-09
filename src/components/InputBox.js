import React from "react";

const InputBox=({searchItems})=>{

    
    return(
        <div>
		<input 
		type='search' 
		placeholder ="Search for Images" 
		onChange = {searchItems}
        // value={userInput}
		/>
        {/* {suggestionsListComponent} */}
		</div>
    );
}

export default InputBox