import React from 'react';

const Circle = ({ number,colorChange,count }) => {
  const circleStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border:"2px solid white",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    position:'relative'
  };
  // console.log(count,'counttttttttttttt');
  return (
    <div style={circleStyle} className={`${colorChange ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} `}>
      <p>
        {number}
      </p>
      {count>0 && 
        <div className='absolute bg-green-500 px-2 border-2 border-white top-0 right-[-50%]'>
          {count}
        </div>
      }
    </div>
  );
};

export default Circle;
