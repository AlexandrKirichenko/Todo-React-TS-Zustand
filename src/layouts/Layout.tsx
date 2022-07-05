import React from 'react';

type Props = {
	children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({children}) => {
	return (
		<div className='bg-gray-900 h-screen text-white py-10 w-full'>{children}</div>
	);
};

export default Layout;