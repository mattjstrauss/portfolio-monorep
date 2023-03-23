import Link from 'next/link';

export default function Nav() {
	return (
		<nav>
			<Link href="/experiences">Experiences</Link>
			<Link href="/add-experience">Add Experience</Link>
			<Link href="/skills">Skills</Link>
			<Link href="/add-skill">Add Skill</Link>
			<Link href="/snippets">Snippets</Link>
			<Link href="/add-snippet">Add Snippets</Link>
		</nav>
	);
}
