import {ObjectId} from 'mongodb';
import mongoose from 'mongoose';
import global from '../../../global';
import {SightingType, UserType} from '../../types';

export default class UserDAO {
	userSchema:
    | mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>
    | undefined;

	UserModel: any;

	public async connect() {
		const {connectionString} = global;

		await mongoose.connect(connectionString);
		this.userSchema = new mongoose.Schema({
			name: 'string',
			pass: 'string',
			sighting: 'array',
		});

		if (mongoose.models.user) {
			this.UserModel = mongoose.model('user');
		} else {
			this.UserModel = mongoose.model('user', this.userSchema);
		}
	}

	public async closeConnection() {
		await mongoose.connection.close();
	}

	public async getUserByLogin({name, pass}: { name: string; pass: string }) {
		const result = await this.UserModel.find({name, pass}).then(
			(user: any) => user,
		);
		return result;
	}

	public async getUserById(_id: string) {
		const response = await this.UserModel.find({_id: new ObjectId(_id)}).then(
			(data: any) => {
				data = data[0];
				const user = {
					_id: data._id,
					name: data.name,
					pass: data.name,
					sighting: data.sighting,
				};
				return user;
			},
		);
		return response;
	}

	public async createUser({name, pass, sighting}: UserType) {
		const user = await new this.UserModel({
			name,
			pass,
			sighting,
		});

		const response = await user
			.save()
			.then((user: any) => user)
			.catch((err: any) => err);

		return response;
	}

	public async insertSighting(sighting: SightingType, _id: string): Promise<any> {
		const response = await this.UserModel.findOneAndUpdate(
			{_id: new ObjectId(_id)},
			{$push: {sighting}},
		)
			.then((data: any) => {
				console.log('data', data);
				const user = {
					_id: data._id.toString(),
					name: data.name,
					pass: data.name,
					sighting: data.sighting,
				};
				return user;
			})
			.catch((err: any) => err);

		return response;
	}

	public async getSightings(_id: string) {
		const response = await this.UserModel.find(
			{_id: new ObjectId(_id)},
			{sighting: 1},
		)
			.then((data: any) => data[0].sighting)
			.catch((err: any) => err);
		return response;
	}

	public async find(query: any) {
		const response = await this.UserModel.find(query);
		return response;
	}
}
