import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Category from '@/models/category';
import slugify from 'slugify';

export async function PUT(req, context) {
	await dbConnect;
	const body = await req.json();
	const { name } = body;

	try {
		const updatingCategory = await Category.findByIdAndUpdate(
			context.params.id,
			{
				...body,
				slug: slugify(Name),
			},
			{ new: true }
		);
		return NextResponse.json(updatingCategory);
	} catch (err) {
		return NextResponse.json(err.message, { status: 500 });
	}
}
