import { Document } from 'mongoose';

// eslint-disable-next-line no-shadow
export enum AUTH_PROVIDER {
    // eslint-disable-next-line no-unused-vars
    LOCAL = 'local',
    // eslint-disable-next-line no-unused-vars
    GITHUB = 'github'
}

export interface IUser extends Document {
    username: string,
    email: string,
    password?: string,
    provider: AUTH_PROVIDER,
    socialid?: string
}
