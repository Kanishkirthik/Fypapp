import React from 'react'

function Search() {
  return (
    <div className='search'>
        <input type="text" placeholder='Enter Skills/Companies/Jobs/Locations/Experience'></input>
        <button className='search-btn'>Search</button>
    </div>
  )
}

export default Search