'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
	//to create a category
	const [name, setName] = useState('');
	//for fetching all categories
	const [categories, setCategories] = useState([]);
	//for update and delete
	const [updatingCategory, setUpdatingCategory] = useState(null);

	//to create a category
	const createCategory = async () => {
		try {
			//
		} catch (err) {
			console.log(err);
			toast.error('An error occurred.  Try again.');
		}
	};

	const fetchCategories = async () => {
		try {
			//
		} catch (err) {
			console.log(err);
			toast.error('An error occurred.  Try again.');
		}
	};

	const updateCategory = async () => {
		try {
			//
		} catch (err) {
			console.log(err);
			toast.error('An error occurred.  Try again.');
		}
	};

	const deleteCategory = async () => {
		try {
			//
		} catch (err) {
			console.log(err);
			toast.error('An error occurred.  Try again.');
		}
	};

	return (
		<CategoryContext.Provider
			value={{
				name,
				setName,
				categories,
				setCategories,
				updatingCategory,
				setUpdatingCategory,
				createCategory,
				fetchCategories,
				updateCategory,
				deleteCategory,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategory = () => useContext(CategoryContext);
