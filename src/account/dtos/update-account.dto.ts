import { Prisma } from '@prisma/client'

export interface UpdateAccountDto extends Prisma.AccountUpdateInput {
    firstname?: string
    lastname?: string
    password?: string
    email?: string
}