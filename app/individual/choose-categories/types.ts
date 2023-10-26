export interface Category {
	id: number;
	name: string;
	tag: string;
	tag_id: number;
}

export interface Item {
	id?: number;
	user_id?: number;
	category_id: number;
	laravel_through_key?: number;
	category: Category;
}