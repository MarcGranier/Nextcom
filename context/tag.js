'use client';
import { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
	const [name, setName] = useState('');
	const [parentCategory, setParentCategory] = useState('');
	const [tags, setTags] = useState([]);
	const [updatingTag, setUpdatingTag] = useState(null);

	const createTag = async () => {
		try {
			const response = await fetch(`${process.env.API}/admin/tag`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, parentCategory }),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data);
			} else {
				toast.success('Tag created successfully');
				setName('');
				setParentCategory('');
				setTags([data, ...tags]);
			}
		} catch (err) {
			console.log('err => ', err);
			toast.error('An error occurred while creating a tag');
		}
	};

	const fetchTags = async () => {
		try {
			const response = await fetch(`${process.env.API}/admin/tag`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				toast.error(data);
			} else {
				setTags(data);
			}
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	const updateTag = async () => {
		try {
			const response = await fetch(
				`${process.env.API}/admin/tag/${updatingTag._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatingTag),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast.error(data);
			} else {
				toast.success('Tag updated successfully');
				setUpdatingTag(null);
				setParentCategory('');
				setTags((prevTags) =>
					prevTags?.map((t) => (t._id === data._id ? data : t))
				);
			}
		} catch (err) {
			console.log('err => ', err);
			toast.error('An error occurred while updating a tag');
		}
	};

	const deleteTag = async () => {
		try {
			const response = await fetch(
				`${process.env.API}/admin/tag/${updatingTag._id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast.error(data);
			} else {
				toast.success('Tag deleted');
				setUpdatingTag(null);
				setParentCategory('');
				setTags((prevTags) => prevTags?.filter((t) => t._id !== data._id));
			}
		} catch (err) {
			console.log('err => ', err);
			toast.error('An error occurred while deleting the sub category');
		}
	};

	return (
		<TagContext.Provider
			value={{
				name,
				setName,
				parentCategory,
				setParentCategory,
				createTag,
				tags,
				setTags,
				fetchTags,
				updatingTag,
				setUpdatingTag,
				updateTag,
				deleteTag,
			}}
		>
			{children}
		</TagContext.Provider>
	);
};

export const useTag = () => useContext(TagContext);
