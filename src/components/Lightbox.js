import React from 'react';

export default function Lightbox ({children}) {
  return <div className='lightbox'>
    <div className='lightbox_content'>
      {children}
    </div>
  </div>;
}
