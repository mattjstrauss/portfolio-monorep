import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Header } from '@strauss/components/src';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import dayjs from 'dayjs';

const ALL_EXPERIENCES_QUERY = gql`
	query ALL_EXPERIENCES_QUERY {
		experiences {
			id
			title
			startDate
			endDate
			description {
				document
			}
			skills {
				name
				id
				image {
					publicUrl
				}
			}
			company {
				name
				image {
					publicUrl
				}
			}
		}
	}
`;
interface IExperience {
	id: number;
	title: string;
	company?: {
		name: string;
		image?: {
			publicUrl: string;
		};
	};
	skills?: [
		{
			id: number;
			name: string;
			image?: {
				publicUrl: string;
			};
		},
	];
	description?: any;
	startDate: string;
	endDate?: string;
}

export default function Experiences() {
	const { data, error, loading } = useQuery(ALL_EXPERIENCES_QUERY);
	if (data || error || loading) {
		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error: {error.message}</p>;
	}
	console.log(data);
	return (
		<div>
			<Header>Experiences</Header>
			{data?.experiences.map((experience: IExperience) => (
				<div key={experience.id}>
					<strong>
						<small>{experience.title}</small>
					</strong>
					<h3>
						<img src={experience.company?.image?.publicUrl} />{' '}
						{experience?.company?.name}
					</h3>
					{`${dayjs(experience.startDate).format('MM/YY')} -
					${dayjs(experience.endDate).format('MM/YY')}`}
					{experience.description && (
						<DocumentRenderer document={experience.description.document} />
					)}
					{experience?.skills?.map((skill) => {
						return (
							<span>
								<img
									key={skill.id}
									src={skill?.image?.publicUrl}
									style={{ maxWidth: '30px' }}
								/>
								{skill.name}
							</span>
						);
					})}
				</div>
			))}
		</div>
	);
}
