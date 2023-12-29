import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Tag from '@/models/tag';
import slugify from 'slugify';

export async function POST(req) {
	const body = await req.json();
	await dbConnect();

	try {
		const { name, parentCategory } = body;

		const tag = await Tag.create({
			name,
			parentCategory,
			slug: slugify(name),
		});

		return NextResponse.json(tag, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				err: 'Server error. Please try again.',
			},
			{ status: 500 }
		);
	}
}
