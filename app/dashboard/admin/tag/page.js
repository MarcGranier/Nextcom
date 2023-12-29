import TagCreate from '@/components/tag/TagCreate';
import TagList from '@/components/tag/TagList';

export default function AdminTags() {
	return (
		<div className='container'>
			<div className='row my-5'>
				<div className='col'>
					<p className='lead'>Create Tags</p>
					<TagCreate />
				</div>
			</div>

			<div className='row my-5'>
				<div className='col'>
					<p className='lead'>Tag List</p>
					<TagList />
				</div>
			</div>
		</div>
	);
}
