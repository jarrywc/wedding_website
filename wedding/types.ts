
export type SubTab = {
    title: string,
    body?: string,
    photos?: string[],
    ordered_list?: string[],
    unordered_list?: string[]
}

export type Tabs = {
    tab_title: string,
    body: SubTab[],
    id: string
}



export type LoginCredentials = {
    phoneNumber: string
};

export type RSVP = {
    _id?: string;
    groupId?: string;
    userId?: string;
    usersAttending?: string[] | { _id: string}[]
}

export type InsertedId = {
    insertedId: string
}

export type Table = {
    _id: string
    number: string
    type: string
}

export type Group = {
    _id: string;
    phone: boolean;
    name: string;
    users: [string];
};

export type User = {
    _id: string;
    name: string;
    email?: string;
    phone: string;
    group? : string;
    groupId? : string;
    attending?: boolean;
    table?: string;
    tableId?: string;
    comment?: string;
    organizer?: boolean;
    createdAt? : string;
    updatedAt? : string;
    type?:  number;
}

export type UserReduce = {
    _id: string;
    name?: string;
    attending?: boolean;
    type?: number;
}

export type UserMinimal = {
    userId: string;
    groupId: string;
    groupName: string;
    userName: string;
    userType: number;
}