import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Category from '@/models/category';
import Tag from '@/models/tag';

const ratingSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
			max: 200,
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const likeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			min: 1,
			max: 160,
			text: true,
		},
		slug: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			index: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
			min: 1,
			max: 1000000,
			text: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
			max: 6,
			validate: {
				validator: function (value) {
					return value !== 0;
				},
				message: 'Price must be greater than O',
			},
		},
		previousPrice: Number,
		color: String,
		brand: String,
		stock: Number,
		shipping: {
			type: Boolean,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		tags: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
		images: [
			{
				secure_url: {
					type: String,
					default: '',
				},
				public_id: {
					type: String,
					default: '',
				},
			},
		],
		sold: {
			type: Number,
			default: 0,
		},
		likes: [likeSchema],
		ratings: [ratingSchema],
	},
	{ timestamps: true }
);

productSchema.plugin(uniqueValidator, { message: ' already exists' });

export default mongoose.models.Product ||
	mongoose.model('Product', productSchema);
