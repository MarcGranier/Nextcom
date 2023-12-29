import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Category from '@/models/category';
import slugify from 'slugify';

export async function POST(req) {
	const body = await req.json();
	await dbConnect();

	try {
		const { name } = body;

		const category = await Category.create({
			name,
			slug: slugify(name),
		});

		return NextResponse.json(category);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				err: err._message,
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	await dbConnect();
	try {
		const categories = await Category.find({}).sort({ createdAt: -1 });
		return NextResponse.json(categories);
	} catch (err) {
		return NextResponse.json(err.message, { status: 500 });
	}
}
