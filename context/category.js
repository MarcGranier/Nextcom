'use client';
import { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
	const [name, setName] = useState('');
	const [categories, setCategories] = useState([]);
	const [updatingCategory, setUpdatingCategory] = useState(null);

	const createCategory = async () => {
		try {
			const response = await fetch(`${process.env.API}/admin/category`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name }),
			});
			const data = await response.json();

			if (!response.ok) {
				toast.error(data.err);
			} else {
				toast.success('Category created successfully');
				setName('');
				setCategories([data, ...categories]);
			}
		} catch (err) {
			console.log(err);
			toast.error('An error occurred.  Try again');
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await fetch(`${process.env.API}/admin/category`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.err);
			} else {
				setCategories(data);
			}
		} catch (error) {}
	};

	const updateCategory = async () => {
		try {
			const response = await fetch(
				`${process.env.API}/admin/category/${updatingCategory._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatingCategory),
				}
			);

			const updatedCategory = await response.json();

			if (!response.ok) {
				toast.error(data.err);
			}

			// Update the categories state with the updated category
			setCategories((prevCategories) =>
				prevCategories.map((c) =>
					c._id === updatedCategory._id ? updatedCategory : c
				)
			);

			// Clear the categoryUpdate state
			setUpdatingCategory(null);

			toast.success('Category updated successfully');
		} catch (err) {
			console.log('err => ', err);
			toast.error('An error occurred while updating the category');
		}
	};

	const deleteCategory = async () => {
		try {
			const response = await fetch(
				`${process.env.API}/admin/category/${updatingCategory._id}`,
				{
					method: 'DELETE',
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.err);
			} else {
				toast.success('Category deleted successfully');
				setCategories(
					categories.filter((category) => category._id !== updatingCategory._id)
				);
				setUpdatingCategory(null);
			}
		} catch (err) {
			console.log('err => ', err);
			toast.error(data.err);
		}
	};

	return (
		<CategoryContext.Provider
			value={{
				name,
				setName,
				createCategory,
				categories,
				setCategories,
				fetchCategories,
				updatingCategory,
				setUpdatingCategory,
				updateCategory,
				deleteCategory,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategory = () => useContext(CategoryContext);
