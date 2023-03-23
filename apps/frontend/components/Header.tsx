import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const LogoStyled = styled.h1`
	background: red;
	font-size: 4rem;
	margin: 0 0 1.5rem 2rem;
	z-index: 2;
	position: relative;
	transform: skew(-7deg);
	display: inline-block;
	a {
		color: white;
		text-decoration: none;
		text-transform: uppercase;
		padding: 0.5rem 1rem;
	}
`;

const HeaderStyled = styled.header`
	.bar {
		border-bottom: 10px solid var(--black, black);
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
	}
	.sub-bar {
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid var(--black, black);
	}
`;

export default function Header() {
	return (
		<HeaderStyled>
			<div className="bar" data-test="ok">
				<LogoStyled>
					<Link href="/">matthewjstrauss</Link>
				</LogoStyled>
				<Nav />
			</div>
			<div className="sub-bar">
				<p>Search</p>
			</div>
		</HeaderStyled>
	);
}
