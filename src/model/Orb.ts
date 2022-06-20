import {ObjectId} from 'mongodb';
import mongoose from 'mongoose';
import global from '../../global';
import {OrbType} from '../types';

export default class OrbDAO {
	orbSchema:
    | mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>
    | undefined;
	
	OrbModel: any;

	public async connect() {
		const {connectionString} = global;

		await mongoose.connect(connectionString);
		this.orbSchema = new mongoose.Schema({
			nome: 'string',
			tipo: 'string',
			localização: 'string',
			raridade: 'string',
			id: 'number',
			invert: 'number',
		});

		if (mongoose.models.orb) {
			this.OrbModel = mongoose.model('orb');
		} else {
			this.OrbModel = mongoose.model('orb', this.orbSchema);
		}
	}

	public async closeConnection() {
		await mongoose.connection.close();
	}
	
	// public async getUserByLogin({name, pass}: { name: string; pass: string }) {
		// 	const result = await this.UserModel.find({name, pass}).then(
	// 		(user: any) => user,
	// 	);
	// 	return result;
	// }
	
	public async createOrb({nome,
		tipo,
		localização,
		raridade,
		id,
		invert}: OrbType) {
		const orb = await new this.OrbModel({
			nome,
			tipo,
			localização,
			raridade,
			id,
			invert
		});

		const response = await orb
			.save()
			.then((orb: any) => orb)
			.catch((err: any) => err);

		return response;
	}

	public async getOrb() {
		const response = await this.OrbModel.find().then(
			(data: any) => {
				
				return data;
			},
		);
		return response;
	}


	// public async insertSighting(
	// 	sighting: SightingType,
	// 	_id: string,
	// ): Promise<any> {
	// 	const response = await this.UserModel.findOneAndUpdate(
	// 		{_id: new ObjectId(_id)},
	// 		{$push: {sighting}},
	// 	)
	// 		.then((data: any) => {
	// 			console.log('data', data);
	// 			const user = {
	// 				_id: data._id.toString(),
	// 				name: data.name,
	// 				pass: data.name,
	// 				sighting: data.sighting,
	// 			};
	// 			return user;
	// 		})
	// 		.catch((err: any) => err);

	// 	return response;
	// }

	// public async getSightings(_id: string) {
	// 	const response = await this.UserModel.find(
	// 		{_id: new ObjectId(_id)},
	// 		{sighting: 1},
	// 	)
	// 		.then((data: any) => data[0].sighting)
	// 		.catch((err: any) => err);
	// 	return response;
	// }

	// public async find(query: any) {
	// 	const response = await this.UserModel.find(query);
	// 	return response;
	// }
}
