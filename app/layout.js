import './globals.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';

export const metadata = {
	title: 'Nextcom',
	description: 'Ecommerce App using NextJS Full Stack',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
