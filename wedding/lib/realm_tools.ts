import * as Realm from "realm-web";
import {MONGO_API_KEY, REALM_APPID} from "@/lib/constants";
// import * as utils from "@/lib/utils";

export type Document = globalThis.Realm.Services.MongoDB.Document;

export interface RSVP extends Document{
    _id: string;
    groupId: string;
    userId: string;
    usersAttending: [string];
}

export interface Table extends Document{
    _id: string
    number: string
    type: string
    users: [string]
}

export interface Group extends Document {
    _id: string;
    phone: boolean;
    name: string;
    users: [string];
}

export interface User extends Document {
    _id: string;
    name: string;
    email: string;
    phone: string;
    group : string;
    groupId : string;
    attending: boolean;
    table: string;
    tableId: string;
    comment: string;
    organizer: boolean;
    createdAt : string;
    updatedAt : string;
    type: number;

}


// globalThis.Realm.Services.MongoDB.MongoDBCollection<any>

export async function Collection(
    {targetDatabase, targetCollection}:
        {targetDatabase: string, targetCollection: string}){
    let App: Realm.App;
    const ObjectId = Realm.BSON.ObjectID;
    console.log(REALM_APPID)
    App = new Realm.App('application-0-uprvh');

    try {
        var credentials = Realm.Credentials.apiKey(MONGO_API_KEY);
        console.log(`Realm: Cred: ${credentials.payload.key}`)
        console.log(`Realm() Collection: ${targetCollection}`)
        // Attempt to authenticate
        var user = await App.logIn(credentials);
        var client = user.mongoClient('mongodb-atlas');
    } catch (err) {
        return null;
    }
    return client
        .db(targetDatabase)
        .collection<any>(targetCollection);
}