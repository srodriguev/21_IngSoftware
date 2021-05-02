import React from 'react';

const AnswerList = ({AnswersList=[]}) => {
  return (
    <>
    { AnswersList.map((data) => {
        if (data) {
          return (
            <div key={data.name}>
              <h1>{data.name}</h1>
              <h1>{data._id}</h1>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default AnswerList