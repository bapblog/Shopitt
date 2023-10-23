export type userSchemaType = {
    name: string,
    email: string,
    gender: string,
    password: string,
    role: string,
    createdAt?: Date,
    resetPasswordToken?: string
    resetPasswordExpire?: string
}