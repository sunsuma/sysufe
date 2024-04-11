import React, { useState, useEffect } from 'react';

export default function Popular({ onChildValue }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function ListItem({ value, className }) {
    const handleClick = () => {
      onChildValue(value);
      setDropdownOpen(false); // Close the dropdown when an item is clicked
    };

    return (
      <li className={className} onClick={handleClick}>
        {value}
      </li>
    );
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      // Check if the click occurred outside of the dropdown element
      if (dropdownOpen && !event.target.closest('.popular')) {
        setDropdownOpen(false); // Close the dropdown
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className='popular w-full flex-wrap'>
      <h1 onClick={() => setDropdownOpen(!dropdownOpen)} className='cursor-pointer hover:text-gray-800'>What’s popular right now?</h1>

      <div className={`w-full ${dropdownOpen ? 'block' : 'hidden'}`}>
        <ul className='list-items flex flex-col md:flex-row gap-5 justify-center items-center'>
          <ListItem className="w-full border-2 border-[#6B5023]" value="ENGINEERING DAYS" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="BANGALORE STORIES" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="GOA DIARIES" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="NITK STUFFS" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="IIM THINGS" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="IIMB FACTS" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="SHAYARI" />
          <ListItem className="w-full border-2 border-[#6B5023]" value="VIKAS MEENA" />
        </ul>
      </div>
    </div>
  );
}