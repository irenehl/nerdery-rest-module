# nerdery-rest-module

## Summary
* [Description](#description)
* [Installation](#installation)
* [Dependencies](#dependencies)
* [Environment](#environment)
* [Schemas](#schemas)
* [Endpoints](#endpoints)
* [Extra points](#extra-points)
* [Test coverage](#test-coverage)
* [Notes](#notes)

## Description

This API was created in ExpressJS and it works as a blog, you can created, update, delete and read the post or the comments that you created. Also, it works with roles, so if your role is 'MODERATOR' you are allowed to delete post or comments that had reports.

## Installation

* Clone this repository
* Read [dependencies sections](#dependencies)
* Install every dependency running `yarn install`
* Create a `dotenv` file with the variables specified in [environment section](#environment)

## Dependencies

Listed on [packages.json](package.json)

## Environment

This API needs the next environment variables

| Variable          |
|-------------------|
| DATABASE_URL      |
| PORT              |
| JWT_SECRET        |
| SALT              |
| POSTGRES_USER     |
| POSTGRES_PASSWORD |
| PASSPORT_SECRET   |
| MAIL_IDENTITY     |
| HOST              |

## Schemas

The base of the API are `accounts`, `comments`, `post`, these are the models that are handled

```
model Account {
    id             Int      @id @default(autoincrement())
    name           String   @db.VarChar(50)
    lastname       String   @db.VarChar(50)
    email          String   @unique
    password       String
    username       String   @unique @db.VarChar(50)
    role           Role     @default(USER)
    
    createdAt      DateTime @default(now()) @map("created_at")
    updatedAt      DateTime @default(now()) @map("updated_at")

    isPublicEmail  Boolean  @default(false) @map("is_public_email")
    isPublicName   Boolean  @default(false) @map("is_public_name")

    recoveryToken    String?  @db.Uuid @map("recovery_token")
    verifyEmailToken String?  @db.Uuid @map("verify_email_token")

    comments            Comment[]
    posts               Post[]
    reports             Report[]
    reactionsOnComments ReactionsOnComments[]
    reactionsOnPosts    ReactionsOnPosts[]
}
```

```
model Comment {
    id                  Int                   @id @unique @default(autoincrement())
    content             String
    status              ContentStatus         @default(PUBLISHED)
    createdAt           DateTime              @default(now()) @map("created_at")
    updatedAt           DateTime              @default(now()) @map("updated_at")
    reports             Report[]
    author              Account               @relation(fields: [authorId], references: [id], onDelete: Cascade)
    authorId            Int                   @map("author_id")
    post                Post                  @relation(fields: [postId], references: [id], onDelete: Cascade)
    postId              Int                   @map("post_id")
    ReactionsOnComments ReactionsOnComments[]
}
```

```
model Post {
    id               Int                @id @unique @default(autoincrement())
    content          String
    status           ContentStatus      @default(PUBLISHED)
    createdAt        DateTime           @default(now()) @map("created_at")
    updatedAt        DateTime           @default(now()) @map("updated_at")
    reports          Report[]
    author           Account            @relation(fields: [authorId], references: [id], onDelete: Cascade)
    authorId         Int                @map("author_id")
    comments         Comment[]
    ReactionsOnPosts ReactionsOnPosts[]
}
```
You can find all the prisma schemas [here](prisma/schema.prisma)

## Endpoints 

Endpoints are documented in [Insonmia client](https://insomnia.rest/download), you can file the JSON file [here](src/docs/blog-api.json) 

## Extra points

- [x] Recovery password
- [x] Report a comment
- [ ] Deploy (I tried but it fails, [this](https://rest-module-daniela.azurewebsites.net/) is the link, I tried to deploy with Azure)

## Test coverage

This project has 100% of coverage

![image](https://github.com/irenehl/nerdery-rest-module/assets/54600515/1b1c3915-56eb-403a-aa9e-a7c8413e696d)

## Notes

I worked with AWS SES to send the emails, I already made a request to have a production environment with AWS but at this point I don't have any response from them, so, please when you start reviewing let me know so I can add your email as a verified email in AWS and you'll able to test all the functionality 
